<?php

use App\Http\Controllers\Api\ApiDataSelectController;
use Illuminate\Support\Facades\Route;

Route::prefix('entrypoint')
    ->name('^')
    ->group(function () {

        Route::get('/faculties', [ApiDataSelectController::class, 'faculties'])
            ->name('faculty.index');

        Route::get('/departments', [ApiDataSelectController::class, 'departments'])
            ->name('department.index');
    });
