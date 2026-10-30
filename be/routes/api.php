<?php

use App\Http\Controllers\Api\Admin\CMSController;
use App\Http\Controllers\Api\Admin\MetricController;
use App\Http\Controllers\Api\Admin\PageController;
use App\Http\Controllers\Api\Admin\PortofolioController;
use App\Http\Controllers\Api\Admin\SectionController;
use App\Http\Controllers\Api\Admin\SectionHeroController;
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\Admin\UploadController;
use App\Http\Controllers\Api\Admin\WebsiteProfileController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Public\LandingPageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// NOTE: registration is disabled on purpose. The CMS has a single admin account
// created by Database\AdminSeeder (see ADMIN_EMAIL / ADMIN_PASSWORD in .env).
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

Route::get('/landing-page', [LandingPageController::class, 'ShowAllPages']);

// endpoint CMS
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/page/{id}', [PageController::class, 'update']);

    Route::post('/sections', [SectionController::class, 'store']);
    Route::put('/section/{id}', [SectionController::class, 'update']);
    Route::delete('/section/{id}', [SectionController::class, 'destroy']);
    Route::get('/sections-cms', [SectionController::class, 'cms']);

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

    Route::get('/content-cms', [CMSController::class, 'contents']);
    Route::get('/website-profile-cms', [WebsiteProfileController::class, 'index']);
    Route::put('/website-profile-cms', [WebsiteProfileController::class, 'update']);

    Route::post('/upload', [UploadController::class, 'store']);
    Route::delete('/upload', [UploadController::class, 'destroy']);
});
