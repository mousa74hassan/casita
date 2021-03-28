<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Task</title>
    <link rel="stylesheet" href="/css/app.css">
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