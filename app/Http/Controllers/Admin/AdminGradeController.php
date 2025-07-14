<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GradeRequest;
use App\Models\Grade;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminGradeController extends Controller
{
  private const FIELDS = [
        'score',
        'created_at',
        'updated_at',
    ];

    private const FIELDS_RELATIONS = [
        'student' => ['name', 'firstname', 'registration_token', 'gender'],
        'course' => ['name', 'alias'],
        'level' => ['name', 'alias'],
        'year' => ['name', 'is_closed'],
    ];

    private const COLUMNS_SORT = [
        'score',
        'created_at',
        'updated_at',
    ];

    public function index(SearchableService $searchable): Response
    {
        $builder = $searchable->handle(
            Grade::query()->with(['level', 'student', 'course', 'year']),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $grades = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->paginate();

        return Inertia::render('admin/grade/index', [
            'grades' => $grades
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/grade/create');
    }

    public function store(GradeRequest $request): RedirectResponse
    {
        Grade::create($request->validated());

        return redirect()->route('#grade.index')
            ->with('success', 'note ajoutée');
    }

    public function show(string $id): Response
    {
        $grade = Grade::with(['level', 'student', 'course', 'year'])
            ->findOrFail($id);

        return Inertia::render('admin/grade/show', [
            'grade' => $grade,
        ]);
    }

    public function edit(Request $request,  $id): Response
    {

        $grade = Grade::with(['level', 'student', 'course', 'year'])
            ->findOrFail($id);

        return Inertia::render('admin/grade/edit', [
            'grade' => $grade,
        ]);
    }


    public function update(GradeRequest $request, string $id): RedirectResponse
    {
        $grade = Grade::findOrFail($id);

        $grade->update($request->validated());

        return redirect()->route('#grade.index')
            ->with('success', 'note editée');
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $grade = Grade::findOrFail($id);

        $grade->delete();

        return redirect()->route('#grade.index')
            ->with('success', 'note supprimée');
    }
}
