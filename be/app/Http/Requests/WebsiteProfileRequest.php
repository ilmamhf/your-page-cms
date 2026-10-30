<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class WebsiteProfileRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'nullable|string|max:32',
            'location' => 'nullable|string|max:255',
            'theme_primary' => 'nullable|string|size:7|regex:/^#[0-9A-Fa-f]{6}$/',
            'theme_secondary' => 'nullable|string|size:7|regex:/^#[0-9A-Fa-f]{6}$/',

            'social_media' => 'array',
            'social_media.*.id' => 'nullable|integer|exists:social_media,id',
            'social_media.*.name' => 'required|string|max:255',
            'social_media.*.link' => 'nullable|string|max:2048',
            'social_media.*.icon_url' => 'nullable|string|max:2048',
        ];
    }
}
