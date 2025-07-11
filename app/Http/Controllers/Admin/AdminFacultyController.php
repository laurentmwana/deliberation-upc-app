<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FacultyRequest;
use App\Models\Faculty;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminFacultyController extends Controller
{
    public function index(): Response
    {
        $faculties = Faculty::with(['departments'])
            ->orderByDesc('updated_at')
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
