<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CMSContentsResource;
use App\Models\Metric;
use App\Models\Portofolio;
use App\Models\Service;

class CMSController extends Controller
{
    public function contents()
    {
        $services = Service::orderBy('order', 'asc')->get();
        $portofolios = Portofolio::orderBy('order', 'asc')->get();
        $metrics = Metric::orderBy('order', 'asc')->get();

        return new CMSContentsResource([
            'services' => $services,
            'portofolios' => $portofolios,
            'metrics' => $metrics,
        ]);
    }
}
