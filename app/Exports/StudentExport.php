<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class StudentExport implements FromView, ShouldAutoSize, WithTitle, WithEvents
{
    public function __construct(
        private int $levelId,
        private int $yearId
    ) {}

    public function view(): View
    {
        $students = Student::with(['user', 'actualLevel.level', 'actualLevel.year'])
            ->whereHas('actualLevel', function($query) {
                $query->where('level_id', $this->levelId)
                      ->where('year_id', $this->yearId);
            })
            ->orderBy('name')
            ->orderBy('firstname')
            ->get();

        return view('exports.students', [
            'students' => $students
        ]);
    }

    public function title(): string
    {
        return 'Etudiants';
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('A1:H1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => ['rgb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'color' => ['rgb' => '3490DC'],
                    ],
                ]);
            },
        ];
    }
}
