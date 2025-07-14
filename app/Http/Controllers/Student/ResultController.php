<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Result;
use App\Models\Student;
use App\Services\SearchableService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ResultController extends Controller
{
    private const FIELDS = [
        'percent',
        'decision',
        'has_missing_grades',
        'data',
        'file',
        'created_at',
    ];

    private const FIELDS_RELATIONS = [
        'deliberation.year' => ['name', 'is_closed'],
        'deliberation.level' => ['name', 'alias'],
        'deliberation.semester' => ['name', 'full_name'],
    ];

    private const COLUMNS_SORT = [
        'percent',
        'decision',
        'has_missing_grades',
        'created_at',
        'updated_at',
    ];

    public function index(Request $request, SearchableService $searchable): Response
    {
        $user = $request->user();

        $student = Student::where('user_id', $user->id)->first();

        if (!$student) {
            abort(404, "Ce compte n'est pas associé à un étudiant.");
        }

        $builder = $searchable->handle(
            $student->results()->getQuery()
                ->with([
                    'deliberation.year',
                    'deliberation.level',
                    'deliberation.semester'
                ]),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $results = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->defaultSort('-updated_at')
            ->paginate();

        return Inertia::render('result/index', [
            'results' => $results,
            'student' => $student,
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
