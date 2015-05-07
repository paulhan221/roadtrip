$(document).ready(function() {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

function addClickHandlers() {
  $("tr").mouseover(function() {
    console.log("waka");
  });
}
  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom:7,
      center: chicago
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    calcRoute();
  }

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
  function calcRoute() {
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var latitude = response.routes[0].legs[0].steps[5].start_location.A;
        var longitude = response.routes[0].legs[0].steps[5].start_location.F;
        addStepPin(latitude,longitude);
      }    
    });

   var polyline = new GPolyline([
      new GLatLng(start),
      new GLatLng(end)
    ], "#ff0000", 10);
    map.addOverlay(polyline);

  }

  google.maps.event.addDomListener(window, 'load', initialize);
});





