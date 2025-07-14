<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LevelRequest;
use App\Models\Level;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminLevelController extends Controller
{
    private const FIELDS = [
        'name',
        'alias',
        'created_at',
        'updated_at',
    ];

    private const FIELDS_RELATIONS = [
        'department' => ['name', 'alias'],
        'orientation' => ['name'],
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
            Level::query()->with(['courses', 'department', 'orientation']),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $levels = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->paginate();

        return Inertia::render('admin/level/index', [
            'levels' => $levels,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/level/create');
    }

    public function store(LevelRequest $request): RedirectResponse
    {
        Level::create($request->validated());

        return redirect()->route('#level.index')
            ->with('success', 'promotion ajoutée');
    }

    public function show(string $id): Response
    {
        $level = Level::with(['courses', 'department', 'orientation'])
            ->findOrFail($id);

        return Inertia::render('admin/level/show', [
            'level' => $level,
        ]);
    }

    public function edit(string $id): Response
    {
        $level = Level::with(['department', 'orientation'])
            ->findOrFail($id);

        return Inertia::render('admin/level/edit', [
            'level' => $level,
        ]);
    }


    public function update(LevelRequest $request, string $id): RedirectResponse
    {

        $level = Level::findOrFail($id);

        $level->update($request->validated());

        return redirect()->route('#level.index')
            ->with('success', 'promotion editée');
    }

    public function destroy(string $id): RedirectResponse
    {
        $level = Level::findOrFail($id);

        $level->delete();

        return redirect()->route('#level.index')
            ->with('success', 'promotion supprimée');
    }
}
