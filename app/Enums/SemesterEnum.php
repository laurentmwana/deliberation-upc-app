<?php

namespace App\Enums;

enum SemesterEnum: string
{
    case S1 = 'Semestre 1';
    case S2 = 'Semestre 2';
    case S3 = 'Semestre 3';
    case S4 = 'Semestre 4';
    case S5 = 'Semestre 5';
    case S6 = 'Semestre 6';
    case S7 = 'Semestre 7';
    case S8 = 'Semestre 8';
    case S9 = 'Semestre 9';
    case S10 = 'Semestre 10';
    case S11 = 'Semestre 11';
    case S12 = 'Semestre 12';
    case S13 = 'Semestre 13';
    case S14 = 'Semestre 14';

    public static function values(): array
    {
        return array_map(fn(self $case) => $case->value, self::cases());
    }

    public static function keys(): array
    {
        return array_map(fn(self $case) => $case->name, self::cases());
    }
}
