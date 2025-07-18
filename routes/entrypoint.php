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

        Route::get('/orientations', [ApiDataSelectController::class, 'orientations'])
            ->name('orientation.index');

        Route::get('/level-with-semesters', [ApiDataSelectController::class, 'levelsWithSemesters'])
            ->name('level-with-semester.index');

        Route::get('/years', [ApiDataSelectController::class, 'years'])
            ->name('year.index');

        Route::get('/level/with/student-and-course', [ApiDataSelectController::class, 'levelWithCourseAndStudents'])
            ->name('level.course-student');

        Route::get('/students', [ApiDataSelectController::class, 'students'])
            ->name('student.index');

        // END DATA SELECT

        // DATA ENUM SELECT
        Route::get('/enum/genders', [ApiDataEnumSelectController::class, 'genders'])
            ->name('enum.gender.index');
        Route::get('/enum/levels', [ApiDataEnumSelectController::class, 'levels'])
            ->name('enum.level.index');
        // END DATA ENUM SELECT

    });
