<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrientationRequest extends FormRequest
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
            'department_id' => [
                'required',
                'exists:departments,id'
            ]
        ];
    }
}
