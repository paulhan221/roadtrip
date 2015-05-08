$(document).ready(function() {
  var geocoder;
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var infowindow;
  var map;
  var latty;
  var longy;

  // initialize the map
  function initialize() {
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom:7,
      center: chicago,
      // places
      styles: [
      {
        stylers: [
          { visibility: 'simplified' }
        ]
      }
    ]
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    calcRoute();
    // make marker on click
    google.maps.event.addListener(map, 'click', function(e) {
      placeMarker(e.latLng, map);
    });
  }

  // add a pin for a step
  function addStepPin(lat, lng) {
    var itiLatlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      map: map,
      position: itiLatlng
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow = new google.maps.InfoWindow({
      content: "supsup"
    });
    infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
     infowindow.close();
   });
  }

  // calculate directions
  function calcRoute() {
    var request = {
        origin: start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        // add pin for step

        var latitude = response.routes[0].legs[0].steps[5].start_location.A;
        var longitude = response.routes[0].legs[0].steps[5].start_location.F;
        addStepPin(latitude,longitude);
        }    
    });
    codeAddress(start);
    var point = new google.maps.LatLng(41.8781136, -87.62979819999998);
    var request = {
        location: point,
        radius: 500,
        types: ['restaurant']
      };
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }

// placemarker on click
    function placeMarker(position, map) {
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
      map.panTo(position);
      map.setZoom(10);
    }

// places callback
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }
// places marker
    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    // geocode an address
  function codeAddress(address) {
    // var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
    var latty = results[0].geometry.location.A;
    var longy = results[0].geometry.location.F;
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
});





