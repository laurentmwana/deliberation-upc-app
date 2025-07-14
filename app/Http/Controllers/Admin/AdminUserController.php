<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleUserEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\Student;
use App\Models\User;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminUserController extends Controller
{
private const FIELDS = [
        'name',
        'email',
        'created_at',
    ];

    private const FIELDS_RELATIONS = [
        'student' => [
            'name',
            'firstname',
            'registration_token',
            'gender',
        ],
    ];

    private const COLUMNS_SORT = [
        'name',
        'email',
        'created_at',
        'updated_at',
    ];

    public function index(SearchableService $searchable): Response
    {
        $builder = $searchable->handle(
            User::query()
                ->with(['student'])
                ->where('role', '!=', RoleUserEnum::ADMIN->value),
            self::FIELDS,
            self::FIELDS_RELATIONS
        );

        $users = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->defaultSort('-updated_at')
            ->paginate();

        return Inertia::render('admin/user/index', [
            'users' => $users,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/user/create');
    }

    public function store(UserRequest $request): RedirectResponse
    {
        $user = User::create([
            'email' => $request->validated('email'),
            'name' => $request->validated('name'),
            'password' => $request->validated('password'),
        ]);

        $this->addInStudent($user, $request->validated('student_id'));

        return redirect()->route('#user.index')
            ->with('success', 'user ajoutée');
    }

    public function show(string $id): Response
    {
        $user = User::with(['student'])
            ->findOrFail($id);

        return Inertia::render('admin/user/show', [
            'user' => $user,
        ]);
    }

    public function edit(string $id): Response
    {
        $user = User::with(['student'])
            ->findOrFail($id);

        return Inertia::render('admin/user/edit', [
            'user' => $user,
        ]);
    }

    public function update(UserRequest $request, string $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $user->update([
            'email' => $request->validated('email'),
            'name' => $request->validated('name'),
            'password' => $request->validated('password'),
        ]);

        $this->addInStudent($user, $request->validated('student_id'));

        return redirect()->route('#user.index')
            ->with('success', 'user editée');
    }

    public function destroy(string $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $user->delete();

        return redirect()->route('#user.index')
            ->with('success', 'user supprimée');
    }

    private function addInStudent(User $user, int $studentId)
    {
        $student = Student::findOrFail($studentId);

        $student->update([
            'user_id' => $user->id,
        ]);
    }
}
