<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Other\StaticPageController;
use App\Http\Controllers\Student\ResultController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', [StaticPageController::class, 'about'])
    ->name('about');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

Route::middleware(['auth', 'verified', 'student'])
    ->group(function () {
        Route::get('result', [ResultController::class, 'index'])
            ->name('result.index');

        Route::get('download/result/{id}', [ResultController::class, 'download'])
            ->name('result.download');
    });
    
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/entrypoint.php';
require __DIR__.'/admin.php';
