<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Inertia\Inertia;
use Inertia\Response;

class AdminSemesterController extends Controller
{
    public function __invoke(): Response
    {
        $semesters = Semester::orderByDesc('updated_at')
            ->paginate();

        return Inertia::render('admin/semester/index', [
            'semesters' => $semesters,
        ]);
    }
}
