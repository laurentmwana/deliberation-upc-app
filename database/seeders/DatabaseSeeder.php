<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Orientation;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(SemesterSeeder::class);
        Faculty::factory(2)->create();
        Department::factory(4)->create();
        Orientation::factory(4)->create();

        $this->call(YearSeeder::class);
        $this->call(TeacherSeeder::class);
        $this->call(CourseSeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(GradeSeeder::class);
        $this->call(UserSeeder::class);

    }
}
