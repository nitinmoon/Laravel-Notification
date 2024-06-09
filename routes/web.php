<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
|
*/

Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/check-login', [LoginController::class, 'checkLogin'])->name('checkLogin');

/*
|--------------------------------------------------------------------------
| After Login Routes
|--------------------------------------------------------------------------
|
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/logout', [LoginController::class, 'logout'])->name('logout');
});