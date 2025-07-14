<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FacultyRequest;
use App\Models\Faculty;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminFacultyController extends Controller
{

    private const FIELDS = [
        'name',
        'created_at',
        'updated_at',
    ];

    private const FIELDS_RELATIONS = [
        'departments' => ['name', 'alias'],
    ];

    private const COLUMNS_SORT = [
        'name',
        'created_at',
        'updated_at',
    ];

    public function index(SearchableService $searchable): Response
    {
        $builder = $searchable->handle(
            Faculty::query()->with(['departments']),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $faculties = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->paginate();

        return Inertia::render('admin/faculty/index', [
            'faculties' => $faculties,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/faculty/create');
    }

    public function store(FacultyRequest $request): RedirectResponse
    {
        Faculty::create($request->validated());

        return redirect()->route('#faculty.index')
            ->with('success', 'faculté ajoutée');
    }

    public function show(string $id): Response
    {
        $faculty = Faculty::findOrFail($id);

        return Inertia::render('admin/faculty/show', [
            'faculty' => $faculty,
        ]);
    }

    public function edit(string $id): Response
    {
        $faculty = Faculty::findOrFail($id);

        return Inertia::render('admin/faculty/edit', [
            'faculty' => $faculty,
        ]);
    }


    public function update(FacultyRequest $request, string $id): RedirectResponse
    {

        $faculty = Faculty::findOrFail($id);

        $faculty->update($request->validated());

        return redirect()->route('#faculty.index')
            ->with('success', 'faculté editée');
    }

    public function destroy(string $id): RedirectResponse
    {
        $faculty = Faculty::findOrFail($id);

        $faculty->delete();

        return redirect()->route('#faculty.index')
            ->with('success', 'faculté supprimée');
    }
}
