<?php

namespace Database\Seeders;

use App\Models\Year;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class YearSeeder extends Seeder
{
    private const YEARS = [
        ['name' => '2023-2024', 'start' => 2023, 'end' => 2024, 'is_closed' => true],
        ['name' => '2024-2025', 'start' => 2024, 'end' => 2025, 'is_closed' => false],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::YEARS as $year) {
            Year::create($year);
        }
    }
}
