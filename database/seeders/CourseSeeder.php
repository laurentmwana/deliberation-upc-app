<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Level;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Level::with('semesters')->get() as $level) {
            $nCourses = random_int(4, 5);

            for ($i = 0; $i < $nCourses; $i++) {
                $semester = $level->semesters->random();

                Course::factory()->create([
                    'level_id' => $level->id,
                    'semester_id' => $semester->id,
                ]);
            }
        }
    }
}
