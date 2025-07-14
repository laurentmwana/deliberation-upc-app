<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrientationRequest;
use App\Models\Orientation;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminOrientationController extends Controller
{
private const FIELDS = [
        'name',
        'alias',
        'created_at',
        'updated_at',
    ];

    private const FIELDS_RELATIONS = [
        'department' => ['name', 'alias'],
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
            Orientation::query()->with(['department', 'levels']),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $orientations = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->paginate();

        return Inertia::render('admin/orientation/index', [
            'orientations' => $orientations,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/orientation/create');
    }

    public function store(OrientationRequest $request): RedirectResponse
    {
        Orientation::create($request->validated());

        return redirect()->route('#orientation.index')
            ->with('success', 'orientation ajoutée');
    }

    public function show(string $id): Response
    {
        $orientation = Orientation::with(['department', 'levels'])
            ->findOrFail($id);

        return Inertia::render('admin/orientation/show', [
            'orientation' => $orientation,
        ]);
    }

    public function edit(string $id): Response
    {
        $orientation = Orientation::with(['department'])
            ->findOrFail($id);

        return Inertia::render('admin/orientation/edit', [
            'orientation' => $orientation,
        ]);
    }


    public function update(OrientationRequest $request, string $id): RedirectResponse
    {
        $orientation = Orientation::findOrFail($id);

        $orientation->update($request->validated());

        return redirect()->route('#orientation.index')
            ->with('success', 'orientation editée');
    }

    public function destroy(string $id): RedirectResponse
    {
        $orientation = Orientation::findOrFail($id);

        $orientation->delete();

        return redirect()->route('#orientation.index')
            ->with('success', 'orientation supprimée');
    }
}
