function checkFraud() {

    let propertyPrice = parseFloat(document.getElementById("propertyPrice").value);
    let marketPrice = parseFloat(document.getElementById("marketPrice").value);
    let owner = document.getElementById("owner").value;
    let documentNo = document.getElementById("document").value;
    let verified = document.getElementById("verified").value;

    if (
        isNaN(propertyPrice) ||
        isNaN(marketPrice) ||
        owner === "" ||
        documentNo === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    let result = document.getElementById("fraudResult");

    // Basic Fraud Analysis
    if (verified === "No") {

        result.innerHTML =
            "❌ Fraud Risk : HIGH <br> Owner is not verified.";
        result.style.color = "red";

    }
    else if (propertyPrice < (marketPrice * 0.60)) {

        result.innerHTML =
            "⚠ Fraud Risk : MEDIUM <br> Property price is much lower than market value.";
        result.style.color = "orange";

    }
    else {

        result.innerHTML =
            "✅ Fraud Risk : LOW <br> Property appears to be safe.";
        result.style.color = "green";

    }

}