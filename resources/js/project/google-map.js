
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
    apiKey: "AIzaSyCsT140mx0UuES7ZwcfY28HuTUrTnDhxww",
    version: "weekly",

});
let map;


loader.load().then(() => {

    let lat_lng = { lat: 29.6729232, lng: 30.542993 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: lat_lng,
        zoom: 3.5,
    });

    let locations = [];

    axios.get('/get-locations').then(res => {
        let label = '';
        res.data.map(location => {
            if (location.sentiment == 'Positive') label = 'P';
            else if (location.sentiment == 'Negative') label = 'Ng';
            else label = 'Ne';
            let marker = new google.maps.Marker({
                position: location.location,
                map,
                label
            });
            let infowindow = new google.maps.InfoWindow({
                content: location.message,
            });
            marker.addListener("click", () => {
                infowindow.open(map, marker);
            });
            locations.push(marker);
            return marker
        })
    }).catch(error => console.log('error', error));

    Array.from(document.getElementsByClassName('sentiment')).forEach(el => {
        el.addEventListener('click', function () {
            for(let i=0; i<locations.length; i++){
                locations[i].setMap(null);
            }

            let type = el.text;
            if (type == 'All') type = '';

            axios.get('/get-locations/'+type).then(res => {
                let label = '';
                res.data.map(location => {
                    if (location.sentiment == 'Positive') label = 'P';
                    else if (location.sentiment == 'Negative') label = 'Ng';
                    else label = 'Ne';
                    let marker = new google.maps.Marker({
                        position: location.location,
                        map,
                        label
                    });
                    let infowindow = new google.maps.InfoWindow({
                        content: location.message,
                    });
                    marker.addListener("click", () => {
                        infowindow.open(map, marker);
                    });
                    locations.push(marker);
                    return marker
                })

            }).catch(error => console.log('error', error));
        })
    });

});


