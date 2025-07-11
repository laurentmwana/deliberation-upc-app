<?php

use App\Http\Controllers\Admin\AdminCourseController;
use App\Http\Controllers\Admin\AdminDeliberationController;
use App\Http\Controllers\Admin\AdminDepartmentController;
use App\Http\Controllers\Admin\AdminFacultyController;
use App\Http\Controllers\Admin\AdminGradeController;
use App\Http\Controllers\Admin\AdminLevelController;
use App\Http\Controllers\Admin\AdminOrientationController;
use App\Http\Controllers\Admin\AdminSemesterController;
use App\Http\Controllers\Admin\AdminStudentController;
use App\Http\Controllers\Admin\AdminTeacherController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminYearController;
use App\Http\Controllers\Excel\GradeExcelController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->middleware(['auth', 'verified', 'admin'])
    ->name('#')
    ->group(function () {
        Route::resource('faculty', AdminFacultyController::class);
        Route::resource('department', AdminDepartmentController::class);
        Route::resource('orientation', AdminOrientationController::class);
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

        Route::get('semester', AdminSemesterController::class)
            ->name('semester.index');
        Route::resource('user', AdminUserController::class);
        Route::resource('deliberation', AdminDeliberationController::class);


        // EXCEL
        Route::get('excel/grade', [GradeExcelController::class, 'index'])
            ->name('grade.excel.index');

        Route::post('excel/grade/import', [GradeExcelController::class, 'import'])
            ->name('grade.excel.import');

        Route::get('excel/grade/export', [GradeExcelController::class, 'export'])
            ->name('grade.excel.export');
        // END EXCEL

    });
