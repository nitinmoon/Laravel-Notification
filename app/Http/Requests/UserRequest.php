<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

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
        $user = User::find($this->userId);
        return [
            'email' => 'required|email|unique:users,email,'.(isset($user->id) ? $user->id  : ''),
            'phone' => 'required|digits:10|numeric'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Enter a valid email address',
            'email.unique' => 'Email already exists',
            'phone.required' => 'Phone number is required',
            'phone.digits' => 'Phone number must be 10 digit long',
            'phone.numeric' => 'Phone number must be digits'
        ];
    }
}
