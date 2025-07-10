<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Level;
use App\Models\Orientation;
use App\Models\Teacher;
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

    public function teachears(): JsonResponse
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

}
