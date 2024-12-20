<?php

use App\Http\Controllers\UserrController;
use App\Http\Controllers\scoreController;
use App\Http\Controllers\AuthController;  // Ensure you have the AuthController
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes (no authentication needed)
Route::middleware(\App\Http\Middleware\CorsMiddleware::class)->group(function () {
    // User registration (POST request to create a new user)
    Route::post('/users/post', [UserrController::class, 'store']);

    // Login route for authentication
    Route::post('/login', [AuthController::class, 'login']);

    // Other public routes (if needed)
});

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    // Users routes (authentication required)
    Route::get('/score/get', [scoreController::class, 'index']);

    Route::get('/users/get', [UserrController::class, 'index']);
    Route::get('/users/showbyId/{id}', [UserrController::class, 'show']);
    Route::put('/users/update/{id}', [UserrController::class, 'update']);
    Route::delete('/users/delete/{id}', [UserrController::class, 'destroy']);

    // Scores routes (authentication required)
    Route::get('/score/getTopScores', [scoreController::class, 'showTopScores']);
    Route::post('/score/post', [scoreController::class, 'store']);
});

// Additional routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::options('/{any}', function () {
    return response()->json(['status' => 'ok'], 200)
        ->header('Access-Control-Allow-Origin', '*') // Adjust as needed
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
})->where('any', '.*');
