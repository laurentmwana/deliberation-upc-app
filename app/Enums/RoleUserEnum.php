<?php

namespace App\Enums;

enum RoleUserEnum: string
{
    case ADMIN = 'administrateur';

    case STUDENT = 'étudiant';

    public static function values(): array
    {
        return array_map(fn(self $case) => $case->value, self::cases());
    }

    public static function keys(): array
    {
        return array_map(fn(self $case) => $case->name, self::cases());
    }
}
