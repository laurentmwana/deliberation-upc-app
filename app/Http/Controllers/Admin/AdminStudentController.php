<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRequest;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminStudentController extends Controller
{

    public function index(Request $request): Response
    {
        return Inertia::render('admin/student/index');
    }

    public function create(Request $request)
    {
        return Inertia::render('admin/student/create');
    }

    public function store(StudentRequest $request): RedirectResponse
    {
        $user = $request->user();

        $student = Student::create([
            ...$request->validated(),
            'registration_token' => Str::random(10),
         ]);

        $student->actualLevel()->create([
            'year_id' => $request->validated('year_id'),
            'level_id' => $request->validated('level_id'),
        ]);

        return redirect()->route('#student.index')
            ->with('message', 'étudiant créé');
    }


    public function show(Request $request, string $id): Response
    {
        $student = Student::with('actualLevel')->findOrFail($id);

        return Inertia::render('admin/student/show', [
            'student' => $student
        ]);

    }

    public function edit(Request $request, string $id): Response
    {
        $student = Student::with('actualLevel')->findOrFail($id);

        return Inertia::render('admin/student/edit', [
            'student' => $student
        ]);
    }

    public function update(StudentRequest $request, string $id): RedirectResponse
    {
        $student = Student::with('actualLevel')->findOrFail($id);

        $student->update($request->validated());

        $student->actualLevel()->update([
            'year_id' => $request->validated('year_id'),
            'level_id' => $request->validated('level_id'),
        ]);

        return redirect()->route('#student.index')
            ->with('message', 'étudiant edité');
    }

    public function destroy(Request $request,  $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $student = Student::findOrFail($id);

        $student->delete();

        return redirect()->route('#student.index')
            ->with('message', 'étudiant supprimé');

    }
}
