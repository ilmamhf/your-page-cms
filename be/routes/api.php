<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// endpoint publik
Route::get('/pages', [PageController::class, 'index']);
Route::get('/page/{id}', [PageController::class, 'show']);

// endpoint CMS
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/page/{id}', [PageController::class, 'update']);
});