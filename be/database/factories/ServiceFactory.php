<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    protected $model = Service::class;

    private static int $order = 0;
    private static string $currentBusinessType = 'software';

    private static array $catalogs = [
        'software' => [
            ['title' => 'Custom Software Development', 'description' => 'Full-cycle development from architecture to deployment using modern stacks.'],
            ['title' => 'API Development & Integration', 'description' => 'RESTful and GraphQL APIs with robust documentation and testing.'],
            ['title' => 'Cloud Infrastructure & DevOps', 'description' => 'AWS, GCP, Azure setup with CI/CD pipelines and monitoring.'],
            ['title' => 'Legacy Modernization', 'description' => 'Refactor and migrate legacy systems to scalable cloud-native architectures.'],
            ['title' => 'Mobile App Development', 'description' => 'Native iOS/Android and cross-platform apps with React Native or Flutter.'],
            ['title' => 'Technical Consulting', 'description' => 'Architecture reviews, code audits, and technology strategy advisory.'],
        ],
        'creative' => [
            ['title' => 'Brand Identity Design', 'description' => 'Logo systems, visual guidelines, and brand strategy workshops.'],
            ['title' => 'UI/UX Design', 'description' => 'User research, wireframing, prototyping, and usability testing.'],
            ['title' => 'Motion Design & Animation', 'description' => 'Lottie animations, micro-interactions, and explainer videos.'],
            ['title' => 'Digital Marketing Assets', 'description' => 'Social media templates, ad creatives, and campaign visuals.'],
            ['title' => 'Illustration & Iconography', 'description' => 'Custom illustration sets and icon systems for products.'],
            ['title' => 'Design System Creation', 'description' => 'Component libraries, tokens, and documentation for scaling teams.'],
        ],
        'property' => [
            ['title' => 'Residential Sales', 'description' => 'End-to-end buying and selling of homes, condos, and land parcels.'],
            ['title' => 'Commercial Leasing', 'description' => 'Office, retail, and industrial space leasing with market analysis.'],
            ['title' => 'Property Management', 'description' => 'Tenant screening, maintenance coordination, and financial reporting.'],
            ['title' => 'Real Estate Investment Advisory', 'description' => 'Portfolio analysis, acquisition strategy, and ROI optimization.'],
            ['title' => 'Virtual Tours & Staging', 'description' => '3D walkthroughs, drone photography, and virtual staging services.'],
            ['title' => 'Market Valuation Reports', 'description' => 'Comparative market analysis and formal appraisal services.'],
        ],
        'engineering' => [
            ['title' => 'Structural Engineering', 'description' => 'Building design, load calculations, and code compliance verification.'],
            ['title' => 'MEP Design', 'description' => 'Mechanical, electrical, and plumbing systems for commercial projects.'],
            ['title' => 'Civil & Site Engineering', 'description' => 'Grading, drainage, utilities, and infrastructure planning.'],
            ['title' => 'Project Management', 'description' => 'Construction oversight, scheduling, and quality assurance.'],
            ['title' => 'Feasibility Studies', 'description' => 'Site analysis, cost estimation, and regulatory review.'],
            ['title' => 'Sustainability Consulting', 'description' => 'LEED certification, energy modeling, and green building design.'],
        ],
        'small_business' => [
            ['title' => 'Business Strategy', 'description' => 'Growth planning, market positioning, and competitive analysis.'],
            ['title' => 'Financial Advisory', 'description' => 'Bookkeeping, tax planning, and cash flow management.'],
            ['title' => 'Operations Optimization', 'description' => 'Process improvement, SOP development, and team training.'],
            ['title' => 'Digital Presence', 'description' => 'Website, SEO, social media, and online reputation management.'],
            ['title' => 'HR & Compliance', 'description' => 'Hiring frameworks, employee handbooks, and labor law compliance.'],
            ['title' => 'Sales Enablement', 'description' => 'CRM setup, pipeline design, and sales playbook creation.'],
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
            'icon_url' => null,
            'order' => self::$order++,
            'is_active' => true,
        ];
    }
}