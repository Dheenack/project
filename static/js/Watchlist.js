// Load saved properties
window.onload = function () {
    loadProperties();
};

// Add Property
function addProperty() {

    let name = document.getElementById("propertyName").value;
    let price = document.getElementById("propertyPrice").value;
    let location = document.getElementById("propertyLocation").value;

    if (name === "" || price === "" || location === "") {
        alert("Please fill all fields.");
        return;
    }

    let property = {
        name: name,
        price: price,
        location: location
    };

    let properties = JSON.parse(localStorage.getItem("properties")) || [];

    properties.push(property);

    localStorage.setItem("properties", JSON.stringify(properties));

    document.getElementById("propertyName").value = "";
    document.getElementById("propertyPrice").value = "";
    document.getElementById("propertyLocation").value = "";

    loadProperties();
}

// Load Properties
function loadProperties() {

    let watchlist = document.getElementById("watchlist");

    watchlist.innerHTML = "";

    let properties = JSON.parse(localStorage.getItem("properties")) || [];

    properties.forEach(function(property, index) {

        watchlist.innerHTML += `

        <div class="property-card">

        <h3>${property.name}</h3>

        <p><strong>Price :</strong> ₹ ${property.price}</p>

        <p><strong>Location :</strong> ${property.location}</p>

        <button class="delete-btn"
        onclick="deleteProperty(${index})">

        Delete

        </button>

        </div>

        `;

    });

}

// Delete Property
function deleteProperty(index) {

    let properties = JSON.parse(localStorage.getItem("properties")) || [];

    properties.splice(index, 1);

    localStorage.setItem("properties", JSON.stringify(properties));

    loadProperties();

}