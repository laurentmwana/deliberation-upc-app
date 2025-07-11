<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeliberationRequest;
use App\Models\Deliberation;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminDeliberationController extends Controller
{
    public function index(): Response
    {
        $deliberations = Deliberation::with(['year', 'level', 'semester'])
            ->orderByDesc('updated_at')
            ->paginate();

        return Inertia::render('admin/deliberation/index', [
            'deliberations' => $deliberations
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/deliberation/create');
    }

    public function store(DeliberationRequest $request): RedirectResponse
    {
       Deliberation::create($request->validated());

        return redirect()->route('#deliberation.index')
            ->with('success', 'délibération ajoutée');
    }

    public function show(string $id): Response
    {
        $deliberation = Deliberation::with(['year', 'level', 'semester'])
            ->findOrFail($id);

        return Inertia::render('admin/deliberation/show', [
            'deliberation' => $deliberation,
        ]);
    }

    public function edit(string $id): Response
    {
        $deliberation = Deliberation::with(['year', 'level', 'semester'])
            ->findOrFail($id);

        return Inertia::render('admin/deliberation/edit', [
            'deliberation' => $deliberation,
        ]);
    }


    public function update(DeliberationRequest $request, string $id): RedirectResponse
    {
        $deliberation = Deliberation::findOrFail($id);

        $deliberation->update($request->validated());


        return redirect()->route('#deliberation.index')
            ->with('success', 'délibération editée');
    }

    public function destroy(string $id): RedirectResponse
    {
        $deliberation = Deliberation::findOrFail($id);

        $deliberation->delete();

        return redirect()->route('#deliberation.index')
            ->with('success', 'délibération supprimée');
    }
}
