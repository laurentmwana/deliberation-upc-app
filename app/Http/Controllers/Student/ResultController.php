<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Result;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ResultController extends Controller
{
    public function index(Request $request)
    {
         $user = $request->user();

        $student = Student::where('user_id', $user->id)->first();

        if (!$student) {
            return Inertia::render('result/index', [
                'student' => null
            ]);
        }

        $builder = $student->results()->with(['deliberation', 'deliberation.level', 'deliberation.year', 'deliberation.semester']);

        $results = $builder->paginate();

        return Inertia::render('result/index', [
            'results' => $results,
            'student' => $student
        ]);
    }

    public function download(Request $request, string $id): BinaryFileResponse
    {
        $user = $request->user();

        $student = Student::where('user_id', $user->id)->first();

        if (!$student) {
            abort(404, "Ce compte n'est pas associé à un étudiant.");
        }

        $result = $student->results()->findOrFail($id);

        return $this->downloadFile($result);
    }

    private function downloadFile(Result $result): BinaryFileResponse
    {
        if (!Storage::disk('public')->exists($result->file)) {
            abort(404, "Le fichier demandé est introuvable.");
        }

        return response()->download(
            Storage::disk('public')->path($result->file),
            basename($result->file),
            ['Content-Type' => 'application/pdf']
        );
    }
}
