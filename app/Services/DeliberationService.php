<?php

namespace App\Services;

use App\Models\Deliberation;
use App\Models\Student;
use App\Models\Result;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class DeliberationService
{
    public function deliberate(Deliberation $deliberation)
    {
        DB::transaction(function () use ($deliberation) {
            $students = Student::whereHas('actualLevel', function ($query) use ($deliberation) {
                $query->where('level_id', $deliberation->level_id)
                      ->where('year_id', $deliberation->year_id);
            })->get();

            foreach ($students as $student) {
                $this->processStudentResults($student, $deliberation);
            }

            $deliberation->update(['completed_at' => now()]);
        });

        return $deliberation;
    }

    protected function processStudentResults(Student $student, Deliberation $deliberation)
    {
        $results = $this->calculateStudentResults($student, $deliberation);

        $pdfPath = $this->generateResultPdf($student, $deliberation, $results);

        $this->storeResults($student, $deliberation, $results, $pdfPath);
    }

    protected function calculateStudentResults(Student $student, Deliberation $deliberation)
    {
        $grades = $student->grades()
            ->where('level_id', $deliberation->level_id)
            ->where('year_id', $deliberation->year_id)
            ->whereHas('course', function ($query) use ($deliberation) {
                $query->where('semester_id', $deliberation->semester_id);
            })
            ->with('course')
            ->get();

        $expectedCourses = $deliberation->level->courses()
            ->where('semester_id', $deliberation->semester_id)
            ->count();

        $missingGrades = $expectedCourses - $grades->count();

        $results = [
            'courses' => [],
            'total_credits' => 0,
            'obtained_credits' => 0,
            'semester_average' => 0,
            'decision' => '',
            'missing_grades' => $missingGrades,
            'has_missing_grades' => $missingGrades > 0,
        ];

        $totalPoints = 0;
        $totalCredits = 0;

        foreach ($grades as $grade) {
            $courseCredits = $grade->course->credits;
            $courseStatus = $this->getCourseStatus($grade->score);
            $coursePoints = $this->calculatePoints($grade->score, $courseCredits);

            $results['courses'][] = [
                'course_id' => $grade->course_id,
                'course_name' => $grade->course->name,
                'score' => $grade->score,
                'credits' => $courseCredits,
                'status' => $courseStatus,
                'points' => $coursePoints,
                'has_grade' => true,
            ];

            $totalPoints += $coursePoints;
            $totalCredits += $courseCredits;

            if ($courseStatus === 'validé') {
                $results['obtained_credits'] += $courseCredits;
            }
        }

        // Ajouter les cours manquants
        if ($missingGrades > 0) {
            $missingCourses = $deliberation->level->courses()
                ->where('semester_id', $deliberation->semester_id)
                ->whereNotIn('id', $grades->pluck('course_id'))
                ->get();

            foreach ($missingCourses as $course) {
                $results['courses'][] = [
                    'course_id' => $course->id,
                    'course_name' => $course->name,
                    'score' => null,
                    'credits' => $course->credits,
                    'status' => 'manquant',
                    'points' => 0,
                    'has_grade' => false,
                ];

                $totalCredits += $course->credits;
            }
        }

        $results['total_credits'] = $totalCredits;

        // Calcul de la moyenne seulement si toutes les notes sont présentes
        if ($missingGrades === 0) {
            $results['semester_average'] = $totalCredits > 0 ? $totalPoints / $totalCredits : 0;
            $results['decision'] = $this->getSemesterDecision(
                $results['semester_average'],
                $results['obtained_credits'],
                $results['total_credits']
            );
        } else {
            $results['semester_average'] = null;
            $results['decision'] = 'Incomplet (notes manquantes)';
        }

        return $results;
    }

    protected function generateResultPdf(Student $student, Deliberation $deliberation, array $results)
    {
        $pdf = Pdf::loadView('deliberations.result-student', [
            'student' => $student,
            'deliberation' => $deliberation,
            'results' => $results,
        ]);

        $filename = 'results/'.$deliberation->id.'/'.$student->id.'.pdf';
        Storage::disk('public')->put($filename, $pdf->output());

        return $filename;
    }

    protected function storeResults(Student $student, Deliberation $deliberation, array $results, string $pdfPath)
    {
        Result::updateOrCreate(
            [
                'student_id' => $student->id,
                'deliberation_id' => $deliberation->id,
            ],
            [
                'data' => json_encode($results),
                'percent' => $results['semester_average'],
                'file' => $pdfPath,
                'decision' => $results['decision'],
                'has_missing_grades' => $results['has_missing_grades'],
            ]
        );
    }

    protected function getCourseStatus(?float $score): string
    {
        if ($score === null) {
            return 'manquant';
        }

        if ($score >= 10) {
            return 'validé';
        } elseif ($score >= 7) {
            return 'compensable';
        } else {
            return 'non validé';
        }
    }

    protected function calculatePoints(?float $score, int $credits): float
    {
        if ($score === null) {
            return 0;
        }

        if ($score >= 10) {
            return $score * $credits;
        } elseif ($score >= 7) {
            return $score * $credits * 0.7;
        } else {
            return 0;
        }
    }

    protected function getSemesterDecision(?float $average, int $obtainedCredits, int $totalCredits): string
    {
        if ($average === null) {
            return 'Incomplet (notes manquantes)';
        }

        if ($average >= 10) {
            if ($obtainedCredits == $totalCredits) {
                return 'Admis';
            } elseif ($obtainedCredits >= $totalCredits * 0.7) {
                return 'Admis avec compensation';
            }
        }

        return 'Redouble';
    }
}
