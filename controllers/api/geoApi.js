require('dotenv').config()

function geoApi(location) {
    var api_key = process.env.GOOGLE_API
    url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${api_key}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => output = data)
    .then(() => console.log(output));
  
  }
  
module.exports = geoApi;