<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\WebsiteProfileResource;
use App\Models\SocialMedia;
use App\Models\WebsiteProfile;
use Illuminate\Http\Request;

class WebsiteProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $websiteProfile = WebsiteProfile::with('socialMedias')->first();
        $socialMedias = SocialMedia::orderBy('order')->get();

        return new WebsiteProfileResource([
            'website_profile' => $websiteProfile,
            'social_medias' => $socialMedias
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(WebsiteProfile $websiteProfile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WebsiteProfile $websiteProfile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WebsiteProfile $websiteProfile)
    {
        //
    }
}
