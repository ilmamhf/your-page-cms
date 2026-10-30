<?php

namespace App\Http\Requests;

use App\Models\Metric;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class MetricRequest extends FormRequest
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
            'label' => 'required|string|max:20',
            'value' => 'required|numeric',
            'suffix' => 'nullable|string',
            'order' => 'numeric',
            'is_active' => 'required|boolean',
        ];
    }

    #[Override]
    protected function prepareForValidation()
    {
        if (! $this->filled('order')) {
            $nextOrder = Metric::max('order') + 1;

            $this->merge([
                'order' => $nextOrder,
            ]);
        }
    }
}
