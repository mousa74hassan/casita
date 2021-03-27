<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    public function index()
    {
        $messages = $this->getData();
        $sentiments = array_unique($messages->pluck('sentiment')->toArray());
        return view('index', compact('sentiments'));
    }

    public function getData()
    {
        $response = Http::get('https://spreadsheets.google.com/feeds/list/0Ai2EnLApq68edEVRNU0xdW9QX1BqQXhHRl9sWDNfQXc/od6/public/basic?alt=json');
        $results = $response['feed']['entry'];
        $contents = collect($results)->pluck('content.$t');
        $messages = [];

        foreach ($contents as $content) {
            $messages[] = [
                'messageid' => $this->getValOf('messageid', $content),
                'message' => $this->getValOf('message', $content),
                'sentiment' => $this->getValOf('sentiment', $content),
            ];
        }
        $messages = Cache::remember('messages', 3600,function () use ($messages) {
            return $messages;
        });
        return collect($messages);
    }

    public function getValOf($type, $str)
    {
        switch ($type) {
            case 'messageid':
                preg_match_all('/messageid:\s\d/i',$str,$val);
                $val = explode(':', $val[0][0]);
                $result = trim($val[1]); break;
            case 'message':
                preg_match_all('/message:(.*?)\ssentiment/',$str,$val);
                $result = trim(preg_replace('/,$/', '',$val[1][0])); break;
            case 'sentiment':
                preg_match_all('/sentiment:\s.*/',$str,$m2); $val = explode(':', $m2[0][0]);
                $result = trim($val[1]); break;
            default: $result = '';
        }
        return $result;
    }

    public function getCityInfo($city)
    {
        $messages = $this->getData();

        $city = $messages->filter(function ($msg) use ($city) {
            return stripos($msg['message'], $city);
        })->first();
        if (!$city) return response()->json(['status' => false,'data' => 'Not exists']);
        return response()->json(['status' => true,'data' => $city]);
    }

    public function getLocations($type = '')
    {
        $messages = $this->getData();
        $results = [];
        if (Cache::has('locations')) {
            $results = Cache::get('locations');
        } else {
            $messages->each(function ($res) use (&$results) {
                $results[] = ['location' => getLatLng($res['message']), 'message' => $res['message'], 'sentiment' => $res['sentiment']];
            });
            $results = Cache::remember('locations', 3600, function () use ($results) {
                return $results;
            });
        }

        if ($type) {
            $results = collect($results)->where('sentiment', $type)->values();
        }


        return response()->json($results);
    }

}
