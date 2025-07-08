<?php

use App\Http\Controllers\Admin\AdminCourseController;
use App\Http\Controllers\Admin\AdminDepartmentController;
use App\Http\Controllers\Admin\AdminFacultyController;
use App\Http\Controllers\Admin\AdminGradeController;
use App\Http\Controllers\Admin\AdminLevelController;
use App\Http\Controllers\Admin\AdminStudentController;
use App\Http\Controllers\Admin\AdminTeacherController;
use App\Http\Controllers\Admin\AdminYearController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('#')
    ->group(function () {
        Route::resource('faculty', AdminFacultyController::class);
        Route::resource('departement', AdminDepartmentController::class);
        Route::resource('level', AdminLevelController::class);
        Route::resource('teacher', AdminTeacherController::class);
        Route::resource('course', AdminCourseController::class);

        Route::get('year/{id}', [AdminYearController::class, 'show'])
            ->name('year.show');

        Route::delete('year/{id}/closed', [AdminYearController::class, 'closed'])
            ->name('year.closed');

        Route::get('year', [AdminYearController::class, 'index'])
            ->name('year.index');

        Route::resource('student', AdminStudentController::class);
        Route::resource('grade', AdminGradeController::class);

    });