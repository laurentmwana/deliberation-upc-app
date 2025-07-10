<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('admin/dashboard/index', [
            'countStudents' => Student::count(),
            'countFaculties' => Faculty::count(),
            'countDepartments' => Department::count()
        ]);
    }
}
