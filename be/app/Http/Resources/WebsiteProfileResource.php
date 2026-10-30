<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WebsiteProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $websiteProfile = $this['website_profile'];
        $socialMedias = $this['social_medias'];

        return [
            'website_profile' => $websiteProfile,
            'social_medias' => $socialMedias,
        ];
    }
}
