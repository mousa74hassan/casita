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
            height: 80%;
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
        #header a {
            background-color: white;
            color: black;
            border: 2px solid #4CAF50;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin-left: 20px;
            cursor: pointer;
        }
        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even){background-color: #f2f2f2;}

        #customers tr:hover {background-color: #ddd;}

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>

<div id="header">
    <p><b>Sentiments:</b> <ul>
        @foreach($sentiments as $sentiment)
            <li><a class="sentiment">{{ $sentiment }}</a></li>
        @endforeach
            <li><a class="sentiment">All</a></li>
            <li><a href="#show-all">Show Rows</a></li>
    </ul></p>
</div>

<div id="map">
</div>

<div id="show-all">
    <table id="customers">
        <thead>
        <th>#</th>
        <th>Message ID</th>
        <th>Message</th>
        <th>Sentiment</th>
        </thead>
        <tbody>
        @foreach($messages as $msg)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $msg['messageid'] }}</td>
                <td>{{ $msg['message'] }}</td>
                <td>{{ $msg['sentiment'] }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>

<script src="/js/app.js"></script>
</body>
</html>