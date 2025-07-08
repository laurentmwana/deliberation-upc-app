<?php

namespace App\Http\Requests;

use App\Enums\SemesterEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CourseRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'between:2,100',
            ],

            'alias' => [
                'required',
                'string',
                'between:2,10'
            ],

            'credits' => [
                'required',
                'numeric',
                'between:1,20'
            ],

            'semester' => [
                'required',
                (new Enum(SemesterEnum::cases())),
            ],

            'level_id' => [
                'required',
                'exists:levels,id'
            ],

            'teacher_id' => [
                'required',
                'exists:teachers,id'
            ]
        ];
    }
}
