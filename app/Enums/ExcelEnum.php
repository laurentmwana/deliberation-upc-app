<?php

namespace App\Enums;

enum  ExcelEnum: string
{
    case IMPORT = 'import';
    case EXPORT = 'export';

    public static function values(): array
    {
        return array_map(fn(self $case) => $case->value, self::cases());
    }

    public static function keys(): array
    {
        return array_map(fn(self $case) => $case->name, self::cases());
    }
}
