<?php

use App\Http\Controllers\Admin\AdminDepartmentController;
use App\Http\Controllers\Admin\AdminFacultyController;
use App\Http\Controllers\Admin\AdminLevelController;
use App\Http\Controllers\Admin\AdminTeacherController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('#')
    ->group(function () {
        Route::resource('faculty', AdminFacultyController::class);
        Route::resource('departement', AdminDepartmentController::class);
        Route::resource('level', AdminLevelController::class);
        Route::resource('teacher', AdminTeacherController::class);
    });