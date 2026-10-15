<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\LandingPageResource;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Service;
use App\Models\Portofolio;
use App\Models\Metric;

class LandingPageController extends Controller
{
    public function ShowAllPages() {
        $pages = Page::with(['sections' => function ($query) {
            $query->where('is_active', true)->orderBy('order', 'asc');
        }, 'sections.hero'])->get();

        $services = Service::where('is_active', true)->orderBy('order')->get();
        $portofolios = Portofolio::where('is_active', true)->orderBy('order')->get();
        $metrics = Metric::where('is_active', true)->orderBy('order')->get();

        return new LandingPageResource([
            'pages' => $pages,
            'services' => $services,
            'portofolios' => $portofolios,
            'metrics' => $metrics,
        ]);
    }
}
