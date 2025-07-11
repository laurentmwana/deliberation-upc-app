<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class GradeExcelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'year_id' => 'required|integer|exists:years,id',
            'level_id' => 'required|integer|exists:levels,id',
            'course_id' => 'required|integer|exists:courses,id',
        ];

        // Règles spécifiques à l'import
        if ($this->isMethod('POST')) {
            $rules['file'] = [
                'required',
                File::types(['xlsx', 'xls', 'csv'])
                    ->max(10240), // 10MB
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Un fichier Excel est requis pour l\'import.',
            'file.mimes' => 'Le fichier doit être de type: xlsx, xls, csv.',
            'file.max' => 'Le fichier ne doit pas dépasser 10MB.',
        ];
    }
}
