<?php

namespace App\Http\Requests;

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Validation\Rules;


class UserRequest extends FormRequest
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
        $id = $this->input('id');

        return [
            'name' => [
                'required',
                'string',
                'between:2,15',
            ],

            'email' => [
                'required',
                'lowercase',
                'string',
                'max:255',
                'email',
                (new Unique(User::class))->ignore($id)
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'student_id' => [
                'required',
                'exists:students,id',
                (new Unique(Student::class, 'id'))->ignore($id)
            ]
        ];
    }
}
