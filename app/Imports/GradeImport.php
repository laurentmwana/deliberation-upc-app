<?php

namespace App\Imports;

use App\Models\Grade;
use App\Models\Student;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Validator;

class GradeImport implements ToCollection, WithHeadingRow
{
    public function __construct(
        private int $levelId,
        private int $yearId,
        private int $courseId
    ) {}

    public function collection(Collection $rows)
    {
        Validator::make($rows->toArray(), [
            '*.matricule' => 'required|string',
            '*.note' => 'nullable|numeric|min:0|max:20',
        ])->validate();

        foreach ($rows as $row) {
            $student = Student::where('registration_token', $row['matricule'])
                ->whereHas('actualLevel', fn($q) => $q
                    ->where('level_id', $this->levelId)
                    ->where('year_id', $this->yearId)
                )->first();

            if ($student) {
                Grade::updateOrCreate(
                    [
                        'student_id' => $student->id,
                        'level_id' => $this->levelId,
                        'year_id' => $this->yearId,
                        'course_id' => $this->courseId,
                    ],
                    [
                        'score' => $row['note'] !== null ? round($row['note'], 2) : null,
                    ]
                );
            }
        }
    }

    public function headingRow(): int
    {
        return 1;
    }
}
