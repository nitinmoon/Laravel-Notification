<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest
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
            'type' => 'required',
            'short_text' => 'required|alpha_num|max:500',
            'user_id' => 'required',
            'expiration' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'type.required' => 'Please select type.',
            'short_text.required' => 'Enter a short text.',
            'user_id.required' => 'Please select user.',
            'expiration.required' => 'Please select expiration.'
        ];
    }
}
