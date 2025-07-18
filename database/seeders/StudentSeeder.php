<?php

namespace Database\Seeders;

use App\Enums\RoleUserEnum;
use App\Models\ActualLevel;
use App\Models\Course;
use App\Models\Level;
use App\Models\Student;
use App\Models\User;
use App\Models\Year;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $years = Year::all();

        foreach ($years as $year) {
            foreach (Level::all() as $level) {
                $nStudent = random_int(4, 5);
                for ($i = 0; $i < $nStudent; $i++) {

                    $user = User::factory()->create(['role' => RoleUserEnum::STUDENT]);

                    $student = Student::factory()->create(['user_id' => $user->id]);


                    $studentYears = $years->shuffle()->take(random_int(2, 3));

                    foreach ($studentYears as $year) {
                        ActualLevel::create([
                            'student_id' => $student->id,
                            'year_id' => $year->id,
                            'level_id' => $level->id,
                        ]);
                    }
                }
            }
        }



    }
}

