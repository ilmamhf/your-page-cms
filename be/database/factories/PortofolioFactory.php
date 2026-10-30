<?php

namespace Database\Factories;

use App\Models\Portofolio;
use Illuminate\Database\Eloquent\Factories\Factory;

class PortofolioFactory extends Factory
{
    protected $model = Portofolio::class;

    private static int $order = 0;
    private static string $currentBusinessType = 'software';

    private static array $catalogs = [
        'software' => [
            ['title' => 'FinTech Payment Platform', 'description' => 'Scalable payment gateway processing $2M+ monthly transactions.'],
            ['title' => 'Healthcare SaaS Dashboard', 'description' => 'HIPAA-compliant patient management system for 50+ clinics.'],
            ['title' => 'E-commerce Marketplace', 'description' => 'Multi-vendor platform with real-time inventory and order management.'],
            ['title' => 'Logistics Tracking App', 'description' => 'Real-time fleet tracking with route optimization and driver mobile app.'],
            ['title' => 'EdTech Learning Portal', 'description' => 'Interactive LMS with video streaming, assessments, and analytics.'],
        ],
        'creative' => [
            ['title' => 'Tech Startup Rebrand', 'description' => 'Complete visual identity overhaul for Series A fintech company.'],
            ['title' => 'Mobile Banking App UI', 'description' => 'End-to-end design system for regional bank with 2M users.'],
            ['title' => 'E-commerce Brand Campaign', 'description' => 'Seasonal campaign across web, social, and OOH for fashion retailer.'],
            ['title' => 'SaaS Design System', 'description' => 'Component library and documentation for B2B productivity suite.'],
            ['title' => 'Non-Profit Annual Report', 'description' => 'Data visualization and editorial design for global NGO report.'],
        ],
        'property' => [
            ['title' => 'Downtown Mixed-Use Tower', 'description' => '45-story luxury residential with retail podium, 98% leased.'],
            ['title' => 'Suburban Office Campus', 'description' => '120K sq ft Class A office park sold to REIT at 6.2% cap rate.'],
            ['title' => 'Industrial Logistics Park', 'description' => '500K sq ft last-mile distribution center, fully leased to 3PL.'],
            ['title' => 'Boutique Hotel Conversion', 'description' => 'Historic building adaptive reuse into 80-key lifestyle hotel.'],
            ['title' => 'Retail Strip Center', 'description' => 'Grocery-anchored center with national tenants, NOI growth 12% YoY.'],
        ],
        'engineering' => [
            ['title' => 'High-Rise Commercial Tower', 'description' => '60-story structural design with performance-based seismic engineering.'],
            ['title' => 'Hospital MEP Systems', 'description' => 'Complex medical gas, HVAC, and electrical for 300-bed facility.'],
            ['title' => 'Transit-Oriented Development', 'description' => 'Site grading, utilities, and stormwater for 20-acre TOD project.'],
            ['title' => 'Net-Zero Office Building', 'description' => 'LEED Platinum structural and facade engineering with mass timber.'],
            ['title' => 'Bridge Rehabilitation', 'description' => 'Seismic retrofit and widening of critical arterial bridge.'],
        ],
        'small_business' => [
            ['title' => 'Local Coffee Chain Expansion', 'description' => 'Grew from 3 to 12 locations with standardized operations.'],
            ['title' => 'Family Manufacturing Pivot', 'description' => 'Transitioned to contract manufacturing, 40% revenue increase.'],
            ['title' => 'Professional Services Firm', 'description' => 'Implemented EOS, doubled team size while maintaining margins.'],
            ['title' => 'Regional Restaurant Group', 'description' => 'Menu engineering and labor optimization across 8 concepts.'],
            ['title' => 'E-commerce Brand Scale-up', 'description' => 'DTC to omnichannel, $500K to $5M in 18 months.'],
        ],
    ];

    public static function setBusinessType(string $type): void
    {
        self::$currentBusinessType = $type;
        self::$order = 0;
    }

    public function definition(): array
    {
        $catalog = self::$catalogs[self::$currentBusinessType] ?? self::$catalogs['software'];
        $item = $catalog[self::$order % count($catalog)];

        return [
            'title' => $item['title'],
            'description' => $item['description'],
            'image_url' => null,
            'order' => self::$order++,
            'is_active' => true,
        ];
    }
}