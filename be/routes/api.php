<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MetricController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SectionHeroController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PortofolioController;
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
Route::get('/section-heroes', [SectionHeroController::class, 'index']);
Route::get('/section-hero/{id}', [SectionHeroController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/service/{id}', [ServiceController::class, 'show']);

Route::get('/portofolios', [PortofolioController::class, 'index']);
Route::get('/portofolio/{id}', [PortofolioController::class, 'show']);

Route::get('/metrics', [MetricController::class, 'index']);
Route::get('/metric/{id}', [MetricController::class, 'show']);

// endpoint CMS
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/page/{id}', [PageController::class, 'update']);
    Route::post('/sections', [SectionController::class, 'store']);
    Route::put('/section/{id}', [SectionController::class, 'update']);
    Route::delete('/section/{id}', [SectionController::class, 'destroy']);

    Route::post('/section-heroes', [SectionHeroController::class, 'store']);
    Route::put('/section-hero/{id}', [SectionHeroController::class, 'update']);
    Route::delete('/section-hero/{id}', [SectionHeroController::class, 'destroy']);

    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/service/{id}', [ServiceController::class, 'update']);
    Route::delete('/service/{id}', [ServiceController::class, 'destroy']);

    Route::post('/portofolios', [PortofolioController::class, 'store']);
    Route::put('/portofolio/{id}', [PortofolioController::class, 'update']);
    Route::delete('/portofolio/{id}', [PortofolioController::class, 'destroy']);

    Route::post('/metrics', [MetricController::class, 'store']);
    Route::put('/metric/{id}', [MetricController::class, 'update']);
    Route::delete('/metric/{id}', [MetricController::class, 'destroy']);
});