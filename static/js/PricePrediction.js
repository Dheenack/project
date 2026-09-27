function predictPrice() {

    let city = document.getElementById("city").value;
    let locality = document.getElementById("locality").value;
    let area = parseFloat(document.getElementById("area").value);
    let bedrooms = parseInt(document.getElementById("bedrooms").value);
    let bathrooms = parseInt(document.getElementById("bathrooms").value);
    let age = parseInt(document.getElementById("age").value);
    let distance = parseFloat(document.getElementById("distance").value);

    if (
        isNaN(area) ||
        isNaN(bedrooms) ||
        isNaN(bathrooms) ||
        isNaN(age) ||
        isNaN(distance)
    ) {
        alert("Please fill all fields.");
        return;
    }

    let baseRate = 0;

    if (city === "Pondicherry") {
        baseRate = 6500;
    } else {
        baseRate = 5000;
    }

    let price =
        (area * baseRate) +
        (bedrooms * 300000) +
        (bathrooms * 150000) -
        (age * 20000) -
        (distance * 50000);

    if (price < 0) {
        price = 0;
    }

    document.getElementById("priceResult").innerHTML =
        "Predicted Price : ₹ " + price.toLocaleString("en-IN");

}