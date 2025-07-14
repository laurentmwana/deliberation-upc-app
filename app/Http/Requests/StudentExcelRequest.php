<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StudentExcelRequest extends FormRequest
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
        ];

        if ($this->isMethod('POST')) {
            $rules['file'] = [
                'required',
                File::types(['xlsx', 'xls', 'csv'])
                    ->max(10240),
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'year_id.required' => 'La sélection d\'une année académique est obligatoire',
            'level_id.required' => 'La sélection d\'une promotion est obligatoire',
            'file.required' => 'Un fichier Excel est requis pour l\'import',
            'file.mimes' => 'Le fichier doit être de type : xlsx, xls ou csv',
            'file.max' => 'Le fichier ne doit pas dépasser 10MB',
        ];
    }
}
