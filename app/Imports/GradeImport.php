<?php

namespace App\Imports;

use App\Models\Grade;
use Maatwebsite\Excel\Concerns\ToModel;

class GradeImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Grade([
            //
        ]);
    }
}
