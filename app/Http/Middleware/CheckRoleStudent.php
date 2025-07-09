<?php

namespace App\Http\Middleware;

use App\Enums\RoleUserEnum;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleStudent
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->role !== RoleUserEnum::STUDENT) {
            abort(Response::HTTP_FORBIDDEN, 'Accès refusé : vous devez être étudiant pour accéder à cette ressource.');
        }

        return $next($request);
    }
}
