<?php

function getLatLng($message)
{
    $url = 'https://maps.googleapis.com/maps/api/geocode/json';
    $api_key = 'AIzaSyCsT140mx0UuES7ZwcfY28HuTUrTnDhxww';

    $response = \Illuminate\Support\Facades\Http::get($url, ['address' => $message, 'key' => $api_key]);
    $results = $response->json();
    $location = $results['results'][0]['geometry']['location'];
    return $location;
}