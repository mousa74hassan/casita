
var geocoder;
var map;
var marker;
// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = {lat: 31.042730 , lng: 31.380866 };
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    // The marker, positioned at Uluru
    marker = new google.maps.Marker({
        position: uluru,
        map: map,
        draggable:true,
    });

    google.maps.event.addListener(map, "click", function(event) {
        // get lat/lon of click
        var clickLat = event.latLng.lat();
        var clickLon = event.latLng.lng();

        // show in input box
        document.getElementById("lat").value = clickLat.toFixed(7);
        document.getElementById("lng").value = clickLon.toFixed(7);
        /*******************/
        GetAddress(clickLat.toFixed(7),clickLon.toFixed(7));
        /****************/
        var latlng = new google.maps.LatLng(clickLat,clickLon);
        marker.setPosition(latlng);
        /*marker = new google.maps.Marker({
              position: new google.maps.LatLng(clickLat,clickLon),
              map: map
           });*/
    });
    // }

    //  geocoder = new google.maps.Geocoder;
    //  // infowindow = new google.maps.InfoWindow;

    // marker.addListener('drag', handleEvent);
    // marker.addListener('dragend', handleEvent);
    // document.getElementById('lat').value = 26.381861087276274;
    // document.getElementById('lng').value = 43.99479680000002;
}

function handleEvent(event) {
    // console.log(event.latLng);
    document.getElementById('lat').value = event.latLng.lat();
    document.getElementById('lng').value = event.latLng.lng();
    // document.getElementById('address').value = event.latLng.lng();
    geocodeLatLng(geocoder, map, {lat: parseFloat(event.latLng.lat()), lng: parseFloat(event.latLng.lng())});
}
function geocodeLatLng(geocoder, map, latlng) {
    // var input = document.getElementById('latlng').value;
    // var latlngStr = input.split(',', 2);
    // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                // map.setZoom(11);
                // var marker = new google.maps.Marker({
                //   position: latlng,
                //   map: map
                // });
                // infowindow.setContent(results[0].formatted_address);
                // infowindow.open(map, marker);
                document.getElementById('address').value = results[0].formatted_address;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}


function GetAddress(lat,lng) {
    var lat = parseFloat(lat);
    var lng = parseFloat(lng);
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                //alert("Location: " + results[1].formatted_address);
                document.getElementById("address").value = results[1].formatted_address;
            }/*else if (results[0]) {
                //alert("Location: " + results[1].formatted_address);
    document.getElementById("addresss").value = results[0].formatted_address;
            }*/
        }
    });
}
