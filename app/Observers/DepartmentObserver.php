<?php

namespace App\Observers;

use App\Enums\LevelEnum;
use App\Enums\SemesterEnum;
use App\Models\Department;
use App\Models\Level;
use App\Models\Semester;

class DepartmentObserver
{
    /**
     * Handle the Department "created" event.
     */
    public function created(Department $department): void
    {
        foreach (LevelEnum::cases() as $index => $enum) {
            $level = $department->levels()->create([
                'name' => $enum->value,
                'alias' => $enum->name,
            ]);

            $this->addSemestersToLevel($level, $index);
        }
    }

    /**
     * Add 2 sequential semesters to a level based on its position.
     */
    private function addSemestersToLevel(Level $level, int $levelIndex): void
    {
        // Chaque niveau a deux semestres
        $startSemesterIndex = $levelIndex * 2;

        // On récupère les enums dans l’ordre
        $semesterEnums = SemesterEnum::cases();

        // Protection : s’assurer qu’il y a assez de semestres disponibles
        if (isset($semesterEnums[$startSemesterIndex], $semesterEnums[$startSemesterIndex + 1])) {
            $semesterNames = [
                $semesterEnums[$startSemesterIndex]->name,
                $semesterEnums[$startSemesterIndex + 1]->name,
            ];

            $semesters = Semester::whereIn('name', $semesterNames)->get();

            $level->semesters()->sync($semesters->pluck('id')->toArray());
        }
    }
}
