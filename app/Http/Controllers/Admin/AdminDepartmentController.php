<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DepartmentRequest;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminDepartmentController extends Controller
{
    public function index(): Response
    {
        $departments = Department::with(['faculty', 'levels'])
            ->orderByDesc('updated_at')
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
