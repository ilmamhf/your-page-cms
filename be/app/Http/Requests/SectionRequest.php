<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SectionRequest extends FormRequest
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
            'page_id' => 'required|exists:pages,id',
            'title' => 'required_if:section_type,hero|nullable|string',
            'subtitle' => 'nullable|string',
            'section_type' => 'required|string',
            'order' => 'required|numeric',
            'is_active' => 'required|boolean',

            // Validasi untuk nested object hero_detail
            'hero_detail'             => 'nullable|array',
            'hero_detail.eyebrow'     => 'nullable|string|max:255',
            'hero_detail.hero_text'   => 'nullable|string|max:255',
            'hero_detail.description' => 'nullable|string',
            'hero_detail.image_url'   => 'nullable|url',
        ];
    }
}
