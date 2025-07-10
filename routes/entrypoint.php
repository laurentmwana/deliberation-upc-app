<?php

use App\Http\Controllers\Api\ApiDataEnumSelectController;
use App\Http\Controllers\Api\ApiDataSelectController;
use Illuminate\Support\Facades\Route;

Route::prefix('entrypoint')
    ->name('^')
    ->group(function () {

        // DATA SELECT

        Route::get('/faculties', [ApiDataSelectController::class, 'faculties'])
            ->name('faculty.index');

        Route::get('/departments', [ApiDataSelectController::class, 'departments'])
            ->name('department.index');

        Route::get('/levels', [ApiDataSelectController::class, 'levels'])
            ->name('level.index');

        Route::get('/teachers', [ApiDataSelectController::class, 'teachers'])
            ->name('teacher.index');

        // END DATA SELECT

        // DATA ENUM SELECT
        Route::get('/genders', [ApiDataEnumSelectController::class, 'genders'])
            ->name('gender.index');

        // END DATA ENUM SELECT

    });
