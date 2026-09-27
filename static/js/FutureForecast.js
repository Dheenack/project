function forecastPrice() {

    let currentPrice = parseFloat(document.getElementById("price").value);
    let growthRate = parseFloat(document.getElementById("growth").value);
    let years = parseInt(document.getElementById("years").value);

    if (isNaN(currentPrice) || isNaN(growthRate) || isNaN(years)) {
        alert("Please fill all fields.");
        return;
    }

    // Compound Growth Formula
    let futurePrice = currentPrice * Math.pow((1 + growthRate / 100), years);

    document.getElementById("forecastResult").innerHTML =
        "Estimated Future Price : ₹ " +
        futurePrice.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });

}