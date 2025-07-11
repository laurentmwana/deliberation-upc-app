<?php

namespace App\Enums;

enum LevelEnum: string
{
    case L1 = "Licence 1";
    case L2 = "Licence 2";
    case L3 = "Licence 3";

    case M1 = "Master 1";
    case M2 = "Master 2";

    case D1 = "Doctorat 1";

    case D2 = "Doctorat 2";

    public static function values(): array
    {
        return array_map(fn(self $case) => $case->value, self::cases());
    }

    public static function keys(): array
    {
        return array_map(fn(self $case) => $case->name, self::cases());
    }
}
