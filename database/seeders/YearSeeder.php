<?php

namespace Database\Seeders;

use App\Models\Year;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class YearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $years = [
            ['name' => '2024-2025', 'start' => 2024, 'end' => 2025, 'is_closed' => false],
        ];
        foreach ($years as $year) {
            Year::create($year);
        }
    }
}
