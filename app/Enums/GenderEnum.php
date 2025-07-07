<?php

namespace App\Enums;

enum GenderEnum: string
{
    case MALE = 'masculin';
    case FEMALE = 'féminin';

    public static function values(): array
    {
        return array_map(fn(self $case) => $case->value, self::cases());
    }

    public static function keys(): array
    {
        return array_map(fn(self $case) => $case->name, self::cases());
    }
}
