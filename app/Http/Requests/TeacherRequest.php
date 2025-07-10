<?php

namespace App\Http\Requests;

use App\Enums\GenderEnum;
use App\Models\Teacher;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Unique;

class TeacherRequest extends FormRequest
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
        $id  = $this->input('id');

        return [
            'name' => [
                'required',
                'string',
                'between:2,30',
            ],

            'firstname' => [
                'required',
                'string',
                'between:2,30',
            ],

            'phone' => [
                'required',
                'string',
                'between:10,15',
                (new Unique(Teacher::class))->ignore($id)
            ],

            'gender' => [
                'required',
                (new Enum(GenderEnum::class))
            ],

            'departments' => [
                'required',
                'array',
                'between:1,5'
            ]
        ];
    }
}
