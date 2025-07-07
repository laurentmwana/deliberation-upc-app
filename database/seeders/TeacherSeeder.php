<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Teacher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = Teacher::factory(10)->create();

        foreach ($teachers as $teacher) {

            $nDepartments = random_int(1, 3);

            $dIds = [];

            for ($i=0; $i < $nDepartments; $i++) {
                $dIds[] = Department::all()->random()->id;
            }

            $teacher->departments()->sync($dIds);
        }
    }
}
