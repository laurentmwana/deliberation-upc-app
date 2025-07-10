<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Level;
use Illuminate\Http\JsonResponse;

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

}
