<?php


use App\Enums\RoleUserEnum;

function isAdmin(RoleUserEnum $role): bool
{
    return RoleUserEnum::ADMIN === $role;
}

function isStudent(RoleUserEnum $role): bool
{
    return RoleUserEnum::STUDENT === $role;
}