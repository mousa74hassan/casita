<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Task</title>
    <style>

        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
        #map {
            height: 70%;
        }
        #header {
            height: 20%;
         }
        #header ul, b {
            display: flex;
            justify-content: center;
            list-style-type: none;
        }
        #header li {
            padding: 10px;
        }
    </style>
</head>
<body>

<div id="header">
    <p><b>Sentiments:</b> <ul>
        @foreach($sentiments as $sentiment)
            <li><a class="sentiment">{{ $sentiment }}</a></li>
        @endforeach
    </ul></p>
    <p id="results"></p>
</div>

<div id="map">
</div>

<script src="/js/app.js"></script>
</body>
</html>