<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SectionController;
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
Route::get('/sections', [SectionController::class, 'index']);
Route::get('/section/{id}', [SectionController::class, 'show']);

// endpoint CMS
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/page/{id}', [PageController::class, 'update']);
    Route::post('/sections', [SectionController::class, 'store']);
    Route::put('/section/{id}', [SectionController::class, 'update']);
    Route::delete('/section/{id}', [SectionController::class, 'destroy']);
});