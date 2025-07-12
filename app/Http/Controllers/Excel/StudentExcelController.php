<?php

namespace App\Http\Controllers\Excel;

use App\Exports\StudentExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\StudentExcelRequest;
use App\Imports\StudentImport;
use Maatwebsite\Excel\Facades\Excel;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class StudentExcelController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/student/excel');
    }

    public function import(StudentExcelRequest $request)
    {
        $validated = $request->validated();

        $import = new StudentImport(
            $validated['level_id'],
            $validated['year_id']
        );

         try {
            Excel::import($import, $validated['file']);

            return redirect()->route('#student.index')->with([
                'success' => $this->buildSuccessMessage($import),
                'import_errors' => $import->getErrors()
            ]);
        } catch (\Exception $e) {
            return back()->withErrors([
                'file' => 'Une erreur est survenue lors de l\'import: '.$e->getMessage()
            ]);
        }
    }

    public function export(StudentExcelRequest $request): BinaryFileResponse
    {
        $validated = $request->validated();

        $export = new StudentExport(
            $validated['level_id'],
            $validated['year_id']
        );

        return Excel::download(
            $export,
            $this->generateExportFilename($validated)
        );
    }

    private function buildSuccessMessage(StudentImport $import): string
    {
        $message = sprintf('%d étudiants importés avec succès.', $import->getSuccessCount());

        if (count($import->getErrors())) {
            $message .= sprintf(' %d erreurs.', count($import->getErrors()));
        }

        return $message;
    }

    private function generateExportFilename(array $data): string
    {
        return sprintf(
            'etudiants_niveau_%d_annee_%d_%s.xlsx',
            $data['level_id'],
            $data['year_id'],
            now()->format('Ymd_His')
        );
    }
}
