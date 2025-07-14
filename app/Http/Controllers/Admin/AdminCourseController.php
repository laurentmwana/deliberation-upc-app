<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Models\Course;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminCourseController extends Controller
{
    private const FIELDS = [
        'name',
        'alias',
        'credits',
        'created_at',
    ];

    private const FIELDS_RELATIONS = [
        'teacher' => ['name', 'gender', 'firstname'],
        'level' => ['name', 'alias'],
        'semester' => ['name', 'full_name'],
    ];

    private const COLUMNS_SORT = ['name', 'credits', 'alias', 'created_at', 'updated_at'];

    public function index(SearchableService $searchable): Response
    {
        $builder = $searchable->handle(
            Course::query()->with(['teacher', 'level', 'semester']),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $courses = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->paginate();

        return Inertia::render('admin/course/index', [
            'courses' => $courses,
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('admin/course/create');
    }

    public function store(CourseRequest $request): RedirectResponse
    {
        Course::create($request->validated());

        return redirect()->route('#course.index')
            ->with('success', 'cours ajouté');
    }

    public function show(string $id): Response
    {
        $course = Course::with(['teacher', 'level', 'semester'])
            ->findOrFail($id);

        return Inertia::render('admin/course/show', [
            'course' => $course,
        ]);
    }

    public function edit(string $id): Response
    {
        $course = Course::with(['teacher', 'level', 'semester'])
            ->findOrFail($id);

        return Inertia::render('admin/course/edit', [
            'course' => $course,
        ]);
    }


    public function update(CourseRequest $request, string $id): RedirectResponse
    {
        $course = Course::findOrFail($id);

        $course->update($request->validated());

        return redirect()->route('#course.index')
            ->with('success', 'cours edité');
    }

    public function destroy(string $id): RedirectResponse
    {
        $course = Course::findOrFail($id);

        $course->delete();

        return redirect()->route('#course.index')
            ->with('success', 'cours supprimé');
    }
}
