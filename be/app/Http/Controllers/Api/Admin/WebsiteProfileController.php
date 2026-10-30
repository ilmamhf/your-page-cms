<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\WebsiteProfileRequest;
use App\Http\Resources\WebsiteProfileResource;
use App\Models\WebsiteProfile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class WebsiteProfileController extends Controller
{
    /**
     * The CMS keeps exactly one website profile row.
     */
    private function profile(): WebsiteProfile
    {
        return WebsiteProfile::query()->firstOrFail();
    }

    /**
     * GET /api/website-profile-cms
     */
    public function index()
    {
        $websiteProfile = $this->profile()->load(['socialMedias' => fn ($q) => $q->orderBy('order')]);

        return new WebsiteProfileResource([
            'website_profile' => $websiteProfile,
            'social_medias' => $websiteProfile->socialMedias,
        ]);
    }

    /**
     * PUT /api/website-profile-cms
     *
     * Updates the profile and fully replaces its social media list:
     * rows with an id are updated, rows without are created, and
     * missing ids are deleted. Order follows the submitted order.
     */
    public function update(WebsiteProfileRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $websiteProfile = $this->profile();
            $websiteProfile->update(Arr::only($data, [
                'name',
                'email',
                'phone_number',
                'location',
            ]));

            $incomingIds = collect($data['social_media'] ?? [])->pluck('id')->filter()->all();
            $websiteProfile->socialMedias()
                ->when($incomingIds, fn ($q) => $q->whereNotIn('id', $incomingIds))
                ->delete();

            foreach ($data['social_media'] ?? [] as $index => $social) {
                $payload = Arr::only($social, ['name', 'link', 'icon_url'])
                    + ['order' => $index + 1];

                if (! empty($social['id'])) {
                    $websiteProfile->socialMedias()
                        ->where('id', $social['id'])
                        ->update($payload);
                } else {
                    $websiteProfile->socialMedias()->create($payload);
                }
            }
        });

        $updated = $this->profile()->load(['socialMedias' => fn ($q) => $q->orderBy('order')]);

        return response()->json([
            'message' => 'Website profile edited successfully',
            'data' => new WebsiteProfileResource([
                'website_profile' => $updated,
                'social_medias' => $updated->socialMedias,
            ]),
        ]);
    }
}
