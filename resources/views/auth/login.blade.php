@extends('auth.auth')

@section('content')
<div class="login-page" style="margin-top:-45px;">
    <h2 class="heading">{{ config('app.name') }}</h2>
    <div class="form">
        <h4 class="small-heading">Login</h4>
        <form action="{{ route('checkLogin') }}" method="post" class="login-form" id="login-form">
            <div class="form-group">
                <input class="login-input" type="email" name="email" placeholder="Email"/>
                <span class="error" id="l_error_email"></span>
            </div>
            <div class="form-group">
                <input class="login-input" type="password" name="password" placeholder="Password"/>
                <span class="error" id="l_error_password"></span>
            </div>
            <button type="submit">Login</button>
            
            <p class="message">Don't have an account ? <a href=" ">User sign up here</a></p>
       
             
            <p class="message">	© {{ date('Y') }} {{ config('app.name') }} - All rights reserved!</p>
        </form>
    </div>
</div>
@endsection