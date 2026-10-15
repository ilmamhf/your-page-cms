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
            'title' => 'required|string',
            'subtitle' => 'required|string',
            'section_type' => 'required|string',
            'order' => 'required|numeric',
            'is_active' => 'required|boolean'
        ];
    }
}
