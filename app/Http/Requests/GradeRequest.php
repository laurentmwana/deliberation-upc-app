<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GradeRequest extends FormRequest
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
            'score' => [
                'required',
                'numeric',
                'between:0,20',
            ],

            'level_id' => [
                'required',
                'exists:levels,id'
            ],

            'course_id' => [
                'required',
                'exists:courses,id'
            ],


            'year_id' => [
                'required',
                'exists:years,id'
            ],

            'student_id' => [
                'required',
                'exists:students,id'
            ]
        ];
    }
}
