<?php

use Illuminate\Support\Facades\Route;



Route::get('/', 'HomeController@index');
Route::get('get-data', 'HomeController@getData');
Route::get('get-city-info/{city}', 'HomeController@getCityInfo');
