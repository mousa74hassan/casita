
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
    apiKey: "AIzaSyCsT140mx0UuES7ZwcfY28HuTUrTnDhxww",
    version: "weekly",

});
let map;
let marker;
let geocoder;
let infowindow;

loader.load().then(() => {

    let lat_lng = { lat: 31.0698036, lng: 31.5027398 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: lat_lng,
        zoom: 5,
    });

    marker = new google.maps.Marker({
        position: lat_lng,
        map: map,
        draggable:true,
    });

    google.maps.event.addListener(map, "click", function(event) {
        // get lat/lon of click
        var clickLat = event.latLng.lat();
        var clickLon = event.latLng.lng();

        var latlng = new google.maps.LatLng(clickLat,clickLon);
        marker.setPosition(latlng);

        GetAddress(clickLat.toFixed(7),clickLon.toFixed(7));

        // marker = new google.maps.Marker({
        //       position: new google.maps.LatLng(clickLat,clickLon),
        //       map: map
        //    });
    });

    function GetAddress(lat,lng) {
        var lat = parseFloat(lat);
        var lng = parseFloat(lng);
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = geocoder = new google.maps.Geocoder();

        let city = '';

        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            //console.log('result', results)
            let component;
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {

                    for (var r = 0, rl = results.length; r < rl; r += 1) {
                        var result = results[r];

                        if (!city && result.types[0] === 'locality') {
                            for (let c = 0, lc = result.address_components.length; c < lc; c += 1) {
                                component = result.address_components[c];

                                if (component.types[0] === 'locality') {
                                    city = component.long_name;
                                    break;
                                }
                            }
                        }
                    }
                    console.log('s city', city);
                    if (infowindow) infowindow.close();
                    getInfo(city)
                }
            }
        });
        return city;
    }

});

async function getInfo(city) {
    let contentString = '';

    if (city && city.length > 0) {
        // let response = getInfoWindow(city);

        await axios.get(`/get-city-info/${city}`).then(res => {
            let response = res.data.data;
            console.log(' ress', res.data)
            if (res.data.status == true) {

                contentString =
                    `<div id="content"><div id="siteNotice"></div>
                                <h1 id="firstHeading" class="firstHeading">${city}</h1>
                                <div id="bodyContent"><ul>
                                <li>Message Id : ${response.messageid}</li>
                                <li>Message : ${response.message}</li>
                                <li>Sentiment : ${response.sentiment}</li>
                                </ul></div></div>`;


            } else {
                contentString = '';
            }

            console.log('contentString', contentString)
        });
        infowindow = new google.maps.InfoWindow({
            content: contentString,
        });

    }
    marker.addListener("click", () => {
        if (contentString.length > 0) infowindow.open(map, marker);
        else infowindow.close()
    });

}