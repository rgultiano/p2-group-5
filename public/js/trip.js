let map;
let geocoder;
// This variable will hold id for each card along with its lat, lng value
var coor = [];
// a temp array to hold all coordinates of all listed locations for the polylines to be rendered
var polyCoor = [];
const delDests = [];

// Tried using Jquery to allow for 'enter' to register as 'click'. Doesn't work :(
$("#add").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#submit").click();
  }
});

function init(){
  if(trip_id){
    loadTrip(trip_id);
  }
  document.getElementById('trip_name').addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
        evt.preventDefault();
    }
});
}
async function loadTrip(trip_id){
  const response = await fetch(`/api/users/${user_id}/trips/${trip_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  });
  if (response.ok) {
    const data = await response.json();
    data.destinations.forEach(destination => {
      geocoder.geocode({address: destination.location_name})
      .then(({results}) => {
        renderMap(results[0].geometry.location, destination.location_name, destination.notes, destination.id);
      });
    });
  } else {
    alert("Trip Load failed.")
  }
}

function zoomToObject(obj){
  var bounds = new google.maps.LatLngBounds();
  var points = obj.getPath().getArray();
  for (var n = 0; n < points.length ; n++){
      bounds.extend(points[n]);
  }
  map.fitBounds(bounds);
}

function getId(id) {
  return document.getElementById(id);
}

function uid() {
  return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
}

function appndCoor(id, value) {
  coor.push({id: id, values: {value}})
}

function listPolyCoor() {
  polyCoor = [];
  for (i in coor) {
    polyCoor.push(coor[i]["values"]["value"])
  }
}

function getSearch() {
  var input = getId("add");
  geoCodingApi(input.value);
}

function addCityCard(id, destination_name, notes, db_id) {
  listContent = getId('tripCreator');
  
  const elCard = document.createElement('div');
  elCard.setAttribute('id', `${id}_card`);
  elCard.classList.add('card');

  elCard.innerHTML += `
    <div class="cardHeader">
        <button class="deleteBtn" id="${id}_deleteCard" onclick="deleteCard(this${db_id ? ", '" + db_id + "'": ''})"><i class="far fa-trash-alt"></i></button>
        <input type="hidden" id="${id}_db_id" value="${db_id ? db_id : ''}">
    </div>  
    <div class="cardBody">
        <input class="header3" type="text" name="title" id="${id}_title" value="${destination_name}">
        <textarea class="tripEntry" placeholder="..." cols='35' rows='10' id='${id}_tripEntry'>${notes ? notes : ''}</textarea>
    </div>`;
    listContent.appendChild(elCard);

}

function deleteCard(btn, db_id) {
  var id = btn.id;
  id = id.slice(0, -11);
  $('#'+id+"_card").remove();

  if(db_id)
    delDests.push(db_id);

  polyCoor = []

  for (i in coor) {
    if (coor[i]["id"] == id) {
      coor.splice(i, 1);
    }
  }
  listPolyCoor()
  reInit()
}

function geoCodingApi(locationName) {
  geocoder.geocode({address: locationName})
  .then(({results}) => {
    renderMap(results[0].geometry.location, locationName)
  });
}

function renderMap(geoCodeLocation, locationName, notes, db_id) {
  const id = uid();
  appndCoor(id, geoCodeLocation);

  initMap(geoCodeLocation);
  addCityCard(id, locationName, notes, db_id);

  listPolyCoor();
  polyline(polyCoor);
}

function reInit() {
  // reinit map
  initMap(polyCoor[0]);

  //reinit polylines
  polyline(polyCoor);
}

function initMap(coor) {
  var mapOptions = {
    zoom: 12,
    center: coor,
    disableDefaultUI: true,
    mapId: '8a454c346a18cb76'
  }

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  geocoder = new google.maps.Geocoder();
} 


function polyline(location) {
  const path = new google.maps.Polyline({
        path: location,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      path.setMap(map);
      zoomToObject(path);
}


// TODO: Saving to database functionality required
async function saveData() {
  console.log(coor);

  const destinations = [];

  for (i in coor) {
    var id = coor[i]["id"]
    var location_name = getId(id+"_title").value;
    var notes = getId(id+"_tripEntry").value;
    var db_id = getId(id + "_db_id").value;
    destinations.push({order: i, location_name, notes, id: db_id ? db_id : null })
  }

  const trip = {
    name: getId('trip_name').innerText,
    destinations,
    deleted_destinations: delDests,
    //add additional fields as they are implemented
  };
  console.log(trip);
  console.log('uri', `/api/users/${user_id}/trips${trip_id ? '/' + trip_id : ''}`)
  const response = await fetch(`/api/users/${user_id}/trips${trip_id ? '/' + trip_id : ''}`, {
    method: "POST",
    body: JSON.stringify(trip),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  });

  if (response.ok) {
    if(!trip_id)
      trip_id = response.id;
    alert("Save success.");
  } else {
    alert("Save failed.")
  }
}


window.onload = init;