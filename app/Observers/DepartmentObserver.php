<?php

namespace App\Observers;

use App\Models\Department;
use App\Models\Level;

class DepartmentObserver
{
    private const LEVELS = [
        [
            'name' => 'Licence 1',
            'alias' => 'L1',
        ],
        [
            'name' => 'Licence 2',
            'alias' => 'L2',
        ],
        [
            'name' => 'Licence 3',
            'alias' => 'L3',
        ],
        [
            'name' => 'Master 1',
            'alias' => 'M1',
        ],
        [
            'name' => 'Master 2',
            'alias' => 'M2',
        ],
        [
            'name' => 'Doctorat 1',
            'alias' => 'D1',
        ],
        [
            'name' => 'Doctorat 2',
            'alias' => 'D2',
        ],
    ];


    /**
     * Handle the Department "created" event.
     */
    public function created(Department $department): void
    {
        $department->levels()->createMany(self::LEVELS);
    }

}
