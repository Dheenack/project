from flask import Flask, render_template
import pickle
with open("model/real_estate_xgb.pkl", "rb") as f:
    model_bundle = pickle.load(f)

preprocessor = model_bundle["preprocessor"]
model = model_bundle["model"]
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/price")
def price():
    return render_template("pred.html")

@app.route("/forecast")
def forecast():
    return render_template("FutureForecast.html")

@app.route("/fraud")
def fraud():
    return render_template("FraudDetection.html")

@app.route("/recommendation")
def recommendation():
    return render_template("Recommendation.html")


@app.route("/watchlist")
def watchlist():
    return render_template("Watchlist.html")

@app.route("/verify")
def verify():
    return render_template("DocumentVerify.html")

@app.route("/image")
def image():
    return render_template("AllImageScore.html")

if __name__ == "__main__":
    app.run(debug=True)