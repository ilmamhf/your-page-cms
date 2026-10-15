<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'page_id' => $this->page_id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'section_type' => $this->section_type,
            'order' => $this->order,
            'is_active' => (bool) $this->is_active,
        ];
    }
}
