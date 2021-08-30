require('dotenv').config()

function geoApi(location) {
    var api_key = process.env.GOOGLE_API
    url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${api_key}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => output = data)
    .then(() => pushInitLocation(output));
  
}

function pushInitLocation(value) {
    value = value['results'][0]['geometry']['location']
    initMap(value)
}

let map;
    
// Initializes the google map with a strating central location
function initMap(location) {

    map = new google.maps.Map(getId("map"), {
        // 'location' needs to be lat, lng coordinates
        center: location,
        zoom: 12,
        disableDefaultUI: true,
    });

}

// Function to add markers
function marker(location) {
    new google.maps.Marker({
                // 'location' needs to be lat, lng coordinates
                position: location,
                map,
                title: "Marker",
        });
}

// Function to create polylines
function polyline(location) {
    const path = new google.maps.Polyline({
            // 'location' needs to be an array containing two or more lat, lng coordinates  
            path: location,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          path.setMap(map);
}