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
            'website_profile' => [
                'id' => $websiteProfile->id,
                'name' => $websiteProfile->name,
                'email' => $websiteProfile->email,
                'phone_number' => $websiteProfile->phone_number,
                'location' => $websiteProfile->location,
                'theme_primary' => $websiteProfile->theme_primary,
                'theme_secondary' => $websiteProfile->theme_secondary,
            ],
            'social_medias' => $socialMedias,
        ];
    }
}
