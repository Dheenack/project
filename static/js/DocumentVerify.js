// Image / PDF Preview

document.getElementById("documentFile").addEventListener("change", function () {

    let file = this.files[0];

    if (!file) return;

    document.getElementById("fileName").innerHTML =
        "Selected File : " + file.name;

    // Image Preview
    if (file.type.startsWith("image/")) {

        let reader = new FileReader();

        reader.onload = function (e) {

            let preview = document.getElementById("previewImage");

            preview.src = e.target.result;

            preview.style.display = "block";

        };

        reader.readAsDataURL(file);

    }
    else {

        document.getElementById("previewImage").style.display = "none";

    }

});

// Verify Document

function verifyDocument() {

    let file = document.getElementById("documentFile").files[0];

    if (!file) {

        alert("Please upload a document.");

        return;

    }

    document.getElementById("verifyResult").innerHTML =
        "⏳ Verifying Document...";

    setTimeout(function () {

        document.getElementById("verifyResult").innerHTML =
            "✅ Document Uploaded Successfully <br><br> Ready for AI OCR Verification.";

    }, 2000);

}