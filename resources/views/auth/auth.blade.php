<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport'/>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name') }}</title>
        <link rel="icon" href="{{ asset('assets/img/icon.ico') }}" type="image/x-icon"/>
        <!-- CSS Files -->
        <link rel="stylesheet" href="{{ asset('assets/css/auth.css') }}">
        <!-- bootstrap css -->
        <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body style="">
        <div id="preloader"></div>
        @yield('content')
        <!-- jQuery -->
        <script src="{{ asset('assets/js/core/jquery.3.2.1.min.js') }}"></script>
        <!-- bootstrap js -->
        <script src="{{ asset('assets/js/core/bootstrap.min.js') }}"></script>
        <!-- bootstrap Notify -->
        <script src="{{ asset('assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js') }}"></script>
        <!-- jQuery validation -->
        <script src="{{ asset('assets/js/jquery-validation/jquery.validate.min.js') }}"></script>
        <script src="{{ asset('assets/js/jquery-validation/additional-methods.min.js') }}"></script>
        <!-- auth validation -->
        <script src="{{ asset('assets/js/custom-js/auth-validate.js') }}"></script>
    </body>
</html>