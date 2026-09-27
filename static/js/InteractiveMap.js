// Create Map
var map = L.map('map').setView([19.0760, 72.8777], 10);

// OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap Contributors'
}).addTo(map);


// Store markers
var markers = [];


// Show all properties
function showLocation() {

    let city = document.getElementById("city").value;

    // Remove existing markers
    markers.forEach(function(marker) {
        map.removeLayer(marker);
    });

    markers = [];


    // Get properties belonging to selected city
    let selectedProperties = locations.filter(function(location) {
        return location.city === city;
    });


    if (selectedProperties.length === 0) {
        alert("No properties found for " + city);
        return;
    }


    // Create marker for every property
    selectedProperties.forEach(function(property) {

        let marker = L.marker([
            property.lat,
            property.lng
        ]).addTo(map);


        let propertyName = property.property;

        if (!propertyName || propertyName === "nan") {
            propertyName = "Property";
        }


        marker.bindPopup(`
            <div>
                <b>${propertyName}</b>
                <br>
                <strong>City:</strong> ${property.city}
                <br>
                <strong>Latitude:</strong> ${property.lat}
                <br>
                <strong>Longitude:</strong> ${property.lng}
            </div>
        `);


        markers.push(marker);
    });


    // Center map on first property
    map.setView([
        selectedProperties[0].lat,
        selectedProperties[0].lng
    ], 12);
}