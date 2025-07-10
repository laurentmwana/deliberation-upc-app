<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LevelRequest;
use App\Models\Level;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminLevelController extends Controller
{
    public function index(): Response
    {
        $levels = Level::with(['courses', 'department', 'orientation'])
            ->orderByDesc('updated_at')
            ->paginate();

        return Inertia::render('admin/level/index', [
            'levels' => $levels
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
