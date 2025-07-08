<?php

use App\Http\Controllers\Admin\AdminFacultyController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('#')
    ->group(function () {
        Route::resource('faculty', AdminFacultyController::class);
    });