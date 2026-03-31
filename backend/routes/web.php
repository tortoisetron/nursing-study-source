<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SocialiteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return [
        'app' => 'Nursing Study Source API',
        'status' => 'online',
        'version' => '1.0.0'
    ];
});

// require __DIR__.'/auth.php';

Route::get('/auth/google', [SocialiteController::class, 'redirect']);
Route::get('/auth/google/callback', [SocialiteController::class, 'callback']);
