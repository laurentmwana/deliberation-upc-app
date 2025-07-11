<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Level;
use App\Models\Orientation;
use App\Models\Teacher;
use App\Models\Year;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiDataSelectController extends Controller
{
    public function faculties(): JsonResponse
    {
        $faculties =  Faculty::orderByDesc('updated_at')
            ->get(['name', 'id']);

        return response()->json($faculties);
    }

    public function departments(): JsonResponse
    {
        $departments =  Department::orderByDesc('updated_at')
            ->get(['name', 'id']);

        return response()->json($departments);
    }

    public function levels(): JsonResponse
    {
        $levels =  Level::orderByDesc('updated_at')
            ->get(['name', 'id', 'alias']);

        return response()->json($levels);
    }

    public function teachers(): JsonResponse
    {
        $teachers =  Teacher::orderByDesc('updated_at')
            ->get(['name', 'id', 'firstname']);

        return response()->json($teachers);
    }

    public function orientations(Request $request): JsonResponse
    {
        $departmentId = $request->query->get('department');

        $builder = Orientation::orderByDesc('updated_at');

        if (!empty($departmentId)) {
            $builder->whereIn('department_id', [$departmentId]);
        }

        $orientations = $builder->get(['name', 'id']);

        return response()->json($orientations);
    }

    public function levelsWithSemesters(): JsonResponse
    {
        $builder = Level::with(['semesters', 'department'])->orderByDesc('updated_at');

        $builder->whereHas('semesters', function ($query) {
            $query->orderByDesc('updated_at')->select(['id', 'name']);
        });

        $builder->whereHas('department', function ($query) {
            $query->orderByDesc('updated_at')->select(['id', 'name', 'alias']);
        });

        $levels = $builder->get(['id', 'name', 'alias']);

        return response()->json($levels);
    }

    public function years(Request $request): JsonResponse
    {
        $closed = $request->query->getBoolean('closed', false);

        $years = Year::orderByDesc('updated_at')
            ->where('is_closed', '=', $closed)
            ->get(['id', 'name', 'is_closed']);

        return response()->json($years);
    }

    public function levelWithCourseAndStudents(): JsonResponse
    {
        $levels = Level::with([
            'courses' => function ($query) {
                $query->select('id', 'level_id', 'name', 'alias', 'semester_id')->distinct();
            },
            'courses.semester' => function ($query) {
                $query->select('id', 'name');
            },
            'students' => function ($query) {
                $query->select('students.id', 'name', 'firstname', 'gender')->distinct();
            }
        ])
        ->orderByDesc('updated_at')
        ->get(['id', 'name', 'alias']);

        return response()->json($levels);
    }

}
