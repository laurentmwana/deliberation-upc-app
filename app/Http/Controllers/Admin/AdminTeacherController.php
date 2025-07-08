<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherRequest;
use App\Models\teacher;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminTeacherController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/teacher/index');
    }

    public function create(): Response
    {
        return Inertia::render('admin/teacher/create');
    }

    public function store(TeacherRequest $request): RedirectResponse
    {
        $teacher = Teacher::create($request->validated());

        $teacher->departments()->sync($request->validated('departments'));

        return redirect()->route('#teacher.index')
            ->with('success', 'professeur ajouté');
    }

    public function show(string $id): Response
    {
        $teacher = Teacher::findOrFail($id);

        return Inertia::render('admin/teacher/show', [
            'teacher' => $teacher,
        ]);
    }

    public function edit(string $id): Response
    {
        $teacher = Teacher::findOrFail($id);

        return Inertia::render('admin/teacher/edit', [
            'teacher' => $teacher,
        ]);
    }


    public function update(TeacherRequest $request, string $id): RedirectResponse
    {

        $teacher = Teacher::findOrFail($id);

        $teacher->update($request->validated());

        $teacher->departments()->sync($request->validated('departments'));


        return redirect()->route('#teacher.index')
            ->with('success', 'professeur edité');
    }

    public function destroy(string $id): RedirectResponse
    {
        $teacher = Teacher::findOrFail($id);

        $teacher->delete();

        return redirect()->route('#teacher.index')
            ->with('success', 'professeur supprimé');
    }
}
