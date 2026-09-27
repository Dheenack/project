from flask import Flask, render_template, request, jsonify
import pandas as pd
import ast
import numpy as np
import pickle
from flask_bootstrap import Bootstrap5
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

MODEL_NAME = "Qwen/Qwen2.5-0.5B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

mod = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME
)

mod.eval()

app = Flask(__name__)
Bootstrap5(app)
# Load trained model
with open("model/real_estate_xgb.pkl", "rb") as f:
    bundle = pickle.load(f)

preprocessor = bundle["preprocessor"]
model = bundle["model"]

FAQS = [
    {
        "keywords": [
            "what is this",
            "what is this website",
            "about project",
            "about website",
            "project"
        ],
        "answer": (
            "AI Real Estate is an AI-powered property intelligence platform "
            "that helps users estimate property prices and explore properties "
            "through an interactive map."
        )
    },

    {
        "keywords": [
            "price prediction",
            "predict price",
            "property price",
            "price"
        ],
        "answer": (
            "The Price Prediction module estimates a property's price using "
            "features such as bedrooms, floor number, total floors, area, "
            "furnishing, age, facing, property type, city, locality and "
            "other property characteristics."
        )
    },

    {
        "keywords": [
            "how to predict",
            "how can i predict",
            "predict property",
            "prediction"
        ],
        "answer": (
            "Go to the Price Prediction page, enter the property details "
            "such as bedrooms, area, floor, furnishing, city and locality, "
            "then submit the form to receive the predicted property price."
        )
    },

    {
        "keywords": [
            "interactive map",
            "map",
            "properties map",
            "location"
        ],
        "answer": (
            "The Interactive Map allows you to explore property locations "
            "and view available properties on a map."
        )
    },

    {
        "keywords": [
            "machine learning",
            "ml",
            "model",
            "ai"
        ],
        "answer": (
            "The platform uses a trained machine learning model to estimate "
            "real estate prices based on property characteristics."
        )
    },

    {
        "keywords": [
            "features",
            "what can i do",
            "modules"
        ],
        "answer": (
            "The platform currently provides property price prediction and "
            "an interactive property map."
        )
    },

    {
        "keywords": [
            "help",
            "how to use",
            "help me"
        ],
        "answer": (
            "I can help you with price prediction, the interactive property "
            "map, supported features and how to use this platform."
        )
    }
]
def generate_huggingface_response(user_message):

    prompt = f"""
You are a helpful real estate assistant.

User question:
{user_message}

Answer the user's question clearly and briefly.

Only provide general real estate information.
Do not invent specific property prices, locations, listings,
or information about this website that you were not given.

Answer:
"""

    try:
        inputs = tokenizer(
            prompt,
            return_tensors="pt"
        )

        with torch.no_grad():
            output = mod.generate(
                **inputs,
                max_new_tokens=150
            )

        # Remove the original prompt from the generated output
        generated_tokens = output[0][inputs["input_ids"].shape[1]:]

        answer = tokenizer.decode(
            generated_tokens,
            skip_special_tokens=True
        ).strip()

        return answer

    except Exception as e:
        print("Hugging Face generation error:", e)

        return (
            "I'm currently unable to generate an AI response. "
            "Please try asking about property prices, "
            "property prediction, or the interactive map."
        )
    
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/price")
def price():
    return render_template("pred.html")

@app.route("/map")
def map_page():
        df = pd.read_excel("./data/loc.xlsx")

        locations = []

        for _, row in df.iterrows():

            try:
                map_details = ast.literal_eval(row["MAP_DETAILS"])

                latitude = float(map_details["LATITUDE"])
                longitude = float(map_details["LONGITUDE"])

            except (ValueError, SyntaxError, KeyError, TypeError):
                continue

            locations.append({
            "city": str(row["CITY"]),
            "property": str(row["PROP_NAME"]),
            "lat": latitude,
            "lng": longitude
            })
        return render_template("InteractiveMap.html", locations=locations)


@app.route("/pred", methods=["POST"])
def predict():

    try:

        data = {
            "Bedroom_Num": int(request.form["Bedroom_Num"]),
            "Floor_Num": int(request.form["Floor_Num"]),
            "Total_Floor": int(request.form["Total_Floor"]),
            "Area": float(request.form["Area"]),

            "Furnish": request.form["Furnish"],
            "Age": request.form["Age"],
            "Facing": request.form["Facing"],
            "Property_Type": request.form["Property_Type"],
            "City": request.form["City"],

            "Is_Luxury": int(request.form["Is_Luxury"]),
            "Is_Freehold": int(request.form["Is_Freehold"]),

            "LOCALITY_NAME": request.form["LOCALITY_NAME"]
        }

        # Create DataFrame in the same structure as training data
        input_df = pd.DataFrame([data])

        # Apply trained preprocessing
        transformed_data = preprocessor.transform(input_df)

        # Predict Log_Price
        log_price = model.predict(transformed_data)[0]

        # Convert Log_Price -> Price
        predicted_price = np.exp(log_price)

        return render_template(
            "pred.html",
            prediction=float(predicted_price)
        )

    except Exception as e:

        return render_template(
            "pred.html",
            error=f"Prediction failed: {str(e)}"
        )
    
@app.route("/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json()
        message = data.get("message", "").strip()

        if not message:
            return jsonify({
                "success": False,
                "answer": "Please enter a question."
            }), 400

        normalized_message = message.lower()

        # -------------------------
        # FAQ FIRST
        # -------------------------

        for faq in FAQS:

            for keyword in faq["keywords"]:

                if keyword.lower() in normalized_message:

                    return jsonify({
                        "success": True,
                        "source": "faq",
                        "answer": faq["answer"]
                    })

        # -------------------------
        # HUGGING FACE FALLBACK
        # -------------------------

        answer = generate_huggingface_response(message)

        return jsonify({
            "success": True,
            "source": "huggingface",
            "answer": answer
        })

    except Exception as e:

        print("Chatbot error:", e)

        return jsonify({
            "success": False,
            "answer": "Something went wrong. Please try again."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
