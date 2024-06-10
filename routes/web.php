<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
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
    Route::get('/users', [UserController::class, 'index'])->name('users.list');
    Route::get('/edit/{id}', [UserController::class, 'edit'])->name('users.edit');
    Route::post('/update/{id}', [UserController::class, 'update'])->name('users.update');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.list');
    Route::get('/add', [NotificationController::class, 'add'])->name('notifications.add');
    Route::post('/save', [NotificationController::class, 'save'])->name('notifications.save');
    
});