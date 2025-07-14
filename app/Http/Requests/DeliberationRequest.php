<?php

namespace App\Http\Requests;

use App\Enums\GenderEnum;
use App\Models\Teacher;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Unique;

class DeliberationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => [
                'nullable',
                'string',
                'between:10,1000',
            ],

            'level_id' => [
                'required',
                'exists:levels,id'
            ],

            'year_id' => [
                'required',
                'exists:years,id'
            ],

            'semester_id' => [
                'required',
                'exists:semesters,id'
            ],
        ];
    }
}
