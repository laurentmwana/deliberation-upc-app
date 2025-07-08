<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GradeRequest;
use App\Models\Grade;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminGradeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/grade/index');
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
        $grade = Grade::findOrFail($id);

        return Inertia::render('admin/grade/show', [
            'grade' => $grade,
        ]);
    }

    public function edit(Request $request,  $id): Response
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);


        $grade = Grade::findOrFail($id);

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
