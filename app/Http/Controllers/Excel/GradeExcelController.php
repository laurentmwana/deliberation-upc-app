<?php

namespace App\Http\Controllers\Excel;

use App\Exports\GradeExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\GradeExcelRequest;
use App\Imports\GradeImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class GradeExcelController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/grade/excel');
    }


    public function import(GradeExcelRequest $request)
    {
        $validated = $request->validated();

        Excel::import(
            new GradeImport(
                $validated['level_id'],
                $validated['year_id'],
                $validated['course_id']
            ),
            $validated['file']
        );

        return redirect()->route('#grade.index')
            ->with([
            'success' => sprintf(
                'Importation réussie! %d notes mises à jour.',
                session('import_row_count', 0)
            )
        ]);
    }

    public function export(GradeExcelRequest $request): BinaryFileResponse
    {
        $data = $request->validated();

        $export = new GradeExport(
            $data['level_id'],
            $data['year_id'],
            $data['course_id']
        );

        return Excel::download($export, 'grades.xlsx');
    }
}
