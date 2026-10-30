<?php

namespace App\Http\Requests;

use App\Models\Portofolio;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PortofolioRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
            'order' => 'numeric',
            'is_active' => 'required|boolean',
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->image_url === '') {
            $this->merge([
                'image_url' => null,
            ]);
        }

        if (! $this->filled('order')) {
            $nextOrder = Portofolio::max('order') + 1;

            $this->merge([
                'order' => $nextOrder,
            ]);
        }
    }
}
