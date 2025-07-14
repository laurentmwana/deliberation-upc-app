<?php

namespace App\Exports;

use App\Models\Student;
use App\Models\Course;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class GradeExport implements FromView
{
    public function __construct(
        protected int $levelId,
        protected int $yearId,
        protected int $courseId
    ) {}

    public function view(): View
    {
        $course = Course::find($this->courseId);
        $courseName = $course ? $course->name : 'Cours inconnu';

        $students = Student::query()
            ->with(['actualLevel.level', 'actualLevel.year'])
            ->select('students.*', 'grades.score')
            ->whereHas('actualLevel', fn($q) => $q
                ->where('level_id', $this->levelId)
                ->where('year_id', $this->yearId)
            )
            ->leftJoin('grades', fn($join) => $join
                ->on('students.id', '=', 'grades.student_id')
                ->where('grades.level_id', $this->levelId)
                ->where('grades.year_id', $this->yearId)
                ->where('grades.course_id', $this->courseId)
            )
            ->orderBy('students.name')
            ->orderBy('students.firstname')
            ->get();

        return view('exports.grades', [
            'students' => $students,
            'courseName' => $courseName,
            'headers' => [
                'NOMS',
                'MATRICULE',
                'PROMOTION',
                'ANNEE ACADEMIQUE',
                'COURS',
                'NOTE'
            ]
        ]);
    }
}
