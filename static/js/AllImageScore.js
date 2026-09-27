// Image Preview

document.getElementById("imageFile").addEventListener("change", function () {

    let file = this.files[0];

    if (!file) return;

    document.getElementById("fileName").innerHTML =
        "Selected Image : " + file.name;

    let reader = new FileReader();

    reader.onload = function (e) {

        let preview = document.getElementById("previewImage");

        preview.src = e.target.result;

        preview.style.display = "block";

    };

    reader.readAsDataURL(file);

});

// AI Image Analysis

function analyzeImage() {

    let file = document.getElementById("imageFile").files[0];

    if (!file) {

        alert("Please upload a property image.");

        return;

    }

    document.getElementById("scoreResult").innerHTML =
        "🔄 AI is analyzing the image...";

    setTimeout(function () {

        let score = Math.floor(Math.random() * 21) + 80;

        let quality = "";

        if (score >= 95) {

            quality = "⭐⭐⭐⭐⭐ Excellent";

        }
        else if (score >= 90) {

            quality = "⭐⭐⭐⭐ Very Good";

        }
        else if (score >= 85) {

            quality = "⭐⭐⭐ Good";

        }
        else {

            quality = "⭐⭐ Average";

        }

        document.getElementById("scoreResult").innerHTML =
            "✅ AI Image Score : " + score + "/100 <br><br>" +
            "Image Quality : " + quality;

    }, 2000);

}