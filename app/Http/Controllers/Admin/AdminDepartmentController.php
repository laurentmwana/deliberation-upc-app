<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DepartmentRequest;
use App\Models\Department;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminDepartmentController extends Controller
{
    private const FIELDS = [
        'name',
        'alias',
        'created_at',
        'updated_at',
    ];

    private const FIELDS_RELATIONS = [
        'faculty' => ['name'],
        'levels' => ['name'],
    ];

    private const COLUMNS_SORT = [
        'name',
        'alias',
        'created_at',
        'updated_at',
    ];

    public function index(SearchableService $searchable): Response
    {
        $builder = $searchable->handle(
            Department::query()->with(['faculty', 'levels']),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $departments = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->paginate();

        return Inertia::render('admin/department/index', [
            'departments' => $departments,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/department/create');
    }

    public function store(DepartmentRequest $request): RedirectResponse
    {
        Department::create($request->validated());

        return redirect()->route('#department.index')
            ->with('success', 'département ajouté');
    }

    public function show(string $id): Response
    {
        $department = Department::with(['faculty', 'levels'])
            ->findOrFail($id);

        return Inertia::render('admin/department/show', [
            'department' => $department,
        ]);
    }

    public function edit(string $id): Response
    {
        $department = Department::with(['faculty'])
            ->findOrFail($id);

        return Inertia::render('admin/department/edit', [
            'department' => $department,
        ]);
    }


    public function update(DepartmentRequest $request, string $id): RedirectResponse
    {
        $department = Department::findOrFail($id);

        $department->update($request->validated());

        return redirect()->route('#department.index')
            ->with('success', 'département edité');
    }

    public function destroy(string $id): RedirectResponse
    {
        $department = Department::findOrFail($id);

        $department->delete();

        return redirect()->route('#department.index')
            ->with('success', 'département supprimé');
    }
}
