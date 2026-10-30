<?php

namespace App\Http\Requests;

use App\Models\Service;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
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
            'icon_url' => 'nullable|url',
            'order' => 'numeric',
            'is_active' => 'required|boolean',
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->icon_url === '') {
            $this->merge([
                'icon_url' => null,
            ]);
        }

        if (! $this->filled('order')) {
            $nextOrder = Service::max('order') + 1;

            $this->merge([
                'order' => $nextOrder,
            ]);
        }
    }
}
