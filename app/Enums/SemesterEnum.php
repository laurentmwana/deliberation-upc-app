<?php

namespace App\Enums;

enum SemesterEnum: string
{
    case S1 = 'S1';
    case S2 = 'S2';
    case S3 = 'S3';
    case S4 = 'S4';
    case S5 = 'S5';
    case S6 = 'S6';
    case S7 = 'S7';
    case S8 = 'S8';
    case S9 = 'S9';
    case S10 = 'S10';
    case S11 = 'S11';
    case S12 = 'S12';
    case S13 = 'S13';
    case S14 = 'S14';

    public static function values(): array
    {
        return array_map(fn(self $case) => $case->value, self::cases());
    }

    public static function keys(): array
    {
        return array_map(fn(self $case) => $case->name, self::cases());
    }
}
