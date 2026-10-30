<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\LandingPageResource;
use App\Models\Metric;
use App\Models\Page;
use App\Models\Portofolio;
use App\Models\Service;
use App\Models\WebsiteProfile;

class LandingPageController extends Controller
{
    public function ShowAllPages()
    {
        $pages = Page::with(['sections' => function ($query) {
            $query->where('is_active', true)->orderBy('order', 'asc');
        }, 'sections.hero'])->get();

        $services = Service::where('is_active', true)->orderBy('order')->get();
        $portofolios = Portofolio::where('is_active', true)->orderBy('order')->get();
        $metrics = Metric::where('is_active', true)->orderBy('order')->get();

        $websiteProfile = WebsiteProfile::with(['socialMedias' => function ($query) {
            $query->orderBy('order');
        }])->first();

        return new LandingPageResource([
            'pages' => $pages,
            'services' => $services,
            'portofolios' => $portofolios,
            'metrics' => $metrics,
            'website_profile' => $websiteProfile,
        ]);
    }
}
