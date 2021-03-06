$(document).ready(function() {
  var geocoder;
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var infowindow;
  var map;
  var latty;
  var longy;
  var markers = [];
  var fastFood = ["subway", "mcdonald's", "burger king", "pizza hut", "wendy's", "arby", "domino's pizza", "kfc", "dairy queen", "taco bell", "white castle", "sonic drive-in", "dunkin' donuts", "whataburger" ]

  // initialize the map
  function initialize() {
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom:9,
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

  // calculate directions
  function calcRoute() {
    var waypts = [];
    waypoints.forEach(function(waypoint){
      waypts.push({location: waypoint.address})
    });
    var request = {
        origin: start,
        destination:end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        // add pin for step
        var latitude = response.routes[0].legs[0].steps[5].start_location.A;
        var longitude = response.routes[0].legs[0].steps[5].start_location.F;
        // addStepPin(latitude,longitude);
        }    
    });
    // codeAddress(start);
    // var point = new google.maps.LatLng(41.8781136, -87.62979819999998);
    // var request = {
    //     location: point,
    //     radius: 500,
    //     types: ['restaurant']
    //   };
    //   infowindow = new google.maps.InfoWindow();
    //   var service = new google.maps.places.PlacesService(map);
    //   service.nearbySearch(request, callback);
    }

// placemarker on click
    function placeMarker(position, map) {
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
      markers.push(marker);
      var lat = position.A;
      var longi = position.F;
      map.panTo(position);
      map.setZoom(10);
      // places
      var point = new google.maps.LatLng(lat, longi);
      var request = {
        location: point,
        radius: 20000,
        types: ['restaurant']
      };
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
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
      var latty = place.geometry.location.A;
      var longy = place.geometry.location.F;
      var placeAddress = place.vicinity;
      var placeName = place.name;
      var placeLoc = place.geometry.location;
      if ((fastFood).indexOf(placeName.toLowerCase()) == -1) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      markers.push(marker);
      
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name.link(tripId + "/check_points/new?name=" + placeName + "&address=" + placeAddress + "&latitude=" + latty + "&longitude=" + longy));
        infowindow.open(map, this);
      });
    }
    }
        // $("a").click(function() {
        //   // ajax call
        //   $.ajax({
        //     url: tripId + '/check_points/new',
        //     method: 'GET',
        //     dataType: 'json',
        //     data: {
        //       name: placeName,
        //       address: placeAddress
        //     }, 
        //     success: function(data) {
        //       var name = data.name;
        //       var address = data.address;
        //       var html = '<div class=\"modal fade\">';
        //       debugger;
              //   <div class=\"modal-dialog\">
              //     <div class=\"modal-content\">
              //       <div class=\"modal-header\">
              //         <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>
              //         <h4 class=\"modal-title\">' + name + 
              //         '</h4>
              //       </div>
              //       <div class=\"modal-body\">
              //         <p>' + address + '</p>
              //       </div>
              //       <div class=\"modal-footer\">
              //         <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>
              //         <button type=\"button\" class=\"btn btn-primary\">Save changes</button>
              //       </div>
              //     </div>
              //   </div>
              // </div>';
              // $("body").append(html);
              // debugger;
           // }
         // })
          // end ajax call

        // });

    //   });
    // }

    // geocode an address
  // function codeAddress(address) {
  //   // var address = document.getElementById('address').value;
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //   var latty = results[0].geometry.location.A;
  //   var longy = results[0].geometry.location.F;
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       map.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //           map: map,
  //           position: results[0].geometry.location
  //       });
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }

  // add a pin for a step
  // function addStepPin(lat, lng) {
  //   var itiLatlng = new google.maps.LatLng(lat, lng);
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: itiLatlng
  //   });
  //   google.maps.event.addListener(marker, 'mouseover', function() {
  //     infowindow = new google.maps.InfoWindow({
  //     content: "supsup"
  //   });
  //   infowindow.open(map, marker);
  //   });
  //   google.maps.event.addListener(marker, 'mouseout', function() {
  //    infowindow.close();
  //  });
  // }

  // clear markers
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  function clearMarkers() {
    setAllMap(null);
  }

  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  $("#panel").click(function(){
    clearMarkers();
  });

  google.maps.event.addDomListener(window, 'load', initialize);

});





