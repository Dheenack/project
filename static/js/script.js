// Dashboard Loaded
window.onload = function () {
    console.log("AI Real Estate Dashboard Loaded");
};

// Price Prediction
function openPricePrediction() {
    window.location.href = "/price";
}

// Future Forecast
function openFutureForecast() {
    window.location.href = "/forecast";
}

// Fraud Detection
function openFraudDetection() {
    window.location.href = "/fraud";
}

// Recommendation
function openRecommendation() {
    window.location.href = "/recommendation";
}

// Interactive Map
function openInteractiveMap() {
    window.location.href = "/map";
}

// Watchlist
function openWatchlist() {
    window.location.href = "/watchlist";
}

// Document Verify
function openDocumentVerify() {
    window.location.href = "/verify";
}

// AI Image Score
function openImageScore() {
    window.location.href = "/image";
}

// Card Animation
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", function () {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
        card.style.transform = "translateY(0px)";
    });

});