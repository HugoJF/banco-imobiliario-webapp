<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ mix('js/index.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link
        href="//fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&subset=latin"
        rel="stylesheet"
        type="text/css"
    >

    <!-- Styles -->
    <link href="{{ mix('css/tailwind.css') }}" rel="stylesheet">
</head>
<body>
<div class="min-h-screen bg-gray-100 text-black" id="app">
    @yield('content')
</div>
</body>
</html>
