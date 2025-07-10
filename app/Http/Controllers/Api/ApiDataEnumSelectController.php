<?php

namespace App\Http\Controllers\Api;

use App\Enums\GenderEnum;
use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Level;
use App\Models\Teacher;
use Illuminate\Http\JsonResponse;

class ApiDataEnumSelectController extends Controller
{
    public function genders(): JsonResponse
    {
        $genders =  GenderEnum::values();

        return response()->json($genders);
    }
}
