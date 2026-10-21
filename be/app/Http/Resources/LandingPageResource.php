<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LandingPageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $pages = $this['pages'];
        $services = $this['services'];
        $portofolios = $this['portofolios'];
        $metrics = $this['metrics'];

        return [
            'pages' => $pages->map(function ($page) use ($services, $portofolios, $metrics) {
                return [
                    'id' => $page->id,
                    'name' => $page->name,

                    'sections' => $page->sections->map(function ($section) use ($services, $portofolios, $metrics) {
                        $items = match ($section->section_type) {
                            'services' => ServiceResource::collection($services),
                            'portofolios' => PortofolioResource::collection($portofolios),
                            'metrics' => MetricResource::collection($metrics),
                            default => null
                        };

                        return [
                            'id' => $section->id,
                            'page_id' => $section->page_id,
                            'title' => $section->title,
                            'subtitle' => $section->subtitle,
                            'section_type' => $section->section_type,
                            'order' => $section->order,
                            'is_active' => $section->is_active,
                            
                            'hero_detail' => $section->section_type === 'hero' && $section->hero ? [
                                'eyebrow' => $section->hero->eyebrow,
                                'hero_text' => $section->hero->hero_text,
                                'description' => $section->hero->description,
                                'image_url' => $section->hero->image_url,
                            ] : null,

                            'items' => $items,
                        ];
                    })
                ];
            })
        ];
    }
}
