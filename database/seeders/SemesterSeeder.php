<?php

namespace Database\Seeders;

use App\Enums\SemesterEnum;
use App\Models\Semester;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (SemesterEnum::cases() as $enum) {
            Semester::create([
                'name' => $enum->name,
                'full_name' => $enum->value
            ]);
        }
    }
}
