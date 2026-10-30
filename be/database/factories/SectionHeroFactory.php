<?php

namespace Database\Factories;

use App\Models\SectionHero;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionHeroFactory extends Factory
{
    protected $model = SectionHero::class;

    private static array $catalogs = [
        'software' => [
            'hero' => [
                'eyebrow' => 'Building Digital Products',
                'hero_text' => 'We craft software that scales with your ambition',
                'description' => 'From MVP to enterprise platforms, our team delivers maintainable, secure, and performant solutions.',
            ],
            'about' => [
                'eyebrow' => 'About Us',
                'hero_text' => 'Engineers who understand business outcomes',
                'description' => 'We bridge the gap between technical excellence and commercial reality.',
            ],
            'services' => [
                'eyebrow' => 'Our Expertise',
                'hero_text' => 'Technical capabilities that drive results',
                'description' => 'Full-stack development, cloud architecture, and strategic consulting.',
            ],
            'portfolio' => [
                'eyebrow' => 'Selected Work',
                'hero_text' => 'Products we\'ve shipped for ambitious teams',
                'description' => 'A sample of the platforms, apps, and systems we\'ve brought to life.',
            ],
        ],
        'creative' => [
            'hero' => [
                'eyebrow' => 'Design That Communicates',
                'hero_text' => 'Visual systems that connect brands with people',
                'description' => 'Strategy-led design for companies who believe creativity is a competitive advantage.',
            ],
            'about' => [
                'eyebrow' => 'Our Studio',
                'hero_text' => 'A collective of designers, strategists, and makers',
                'description' => 'We partner with ambitious brands to create work that matters.',
            ],
            'services' => [
                'eyebrow' => 'What We Do',
                'hero_text' => 'End-to-end creative capabilities',
                'description' => 'Brand identity, digital product design, motion, and design systems.',
            ],
            'portfolio' => [
                'eyebrow' => 'Selected Work',
                'hero_text' => 'Projects that shifted perception',
                'description' => 'A curated selection of brand launches, products, and campaigns.',
            ],
        ],
        'property' => [
            'hero' => [
                'eyebrow' => 'Real Estate Excellence',
                'hero_text' => 'Your partner in property investment and transactions',
                'description' => 'Market expertise, negotiation skill, and a network that opens doors.',
            ],
            'about' => [
                'eyebrow' => 'Our Firm',
                'hero_text' => 'Decades of market knowledge, one dedicated team',
                'description' => 'We combine institutional experience with boutique-level service.',
            ],
            'services' => [
                'eyebrow' => 'Our Services',
                'hero_text' => 'Comprehensive real estate solutions',
                'description' => 'Sales, leasing, management, and advisory across all asset classes.',
            ],
            'portfolio' => [
                'eyebrow' => 'Recent Transactions',
                'hero_text' => 'Deals that define the market',
                'description' => 'A track record of successful closings across commercial and residential.',
            ],
        ],
        'engineering' => [
            'hero' => [
                'eyebrow' => 'Engineering Excellence',
                'hero_text' => 'Structural integrity meets design vision',
                'description' => 'Licensed engineers delivering safe, efficient, and innovative solutions.',
            ],
            'about' => [
                'eyebrow' => 'Our Practice',
                'hero_text' => 'Multi-disciplinary engineering for the built environment',
                'description' => 'Structural, civil, MEP, and sustainability expertise under one roof.',
            ],
            'services' => [
                'eyebrow' => 'Engineering Services',
                'hero_text' => 'Technical depth across every project phase',
                'description' => 'From feasibility through construction administration.',
            ],
            'portfolio' => [
                'eyebrow' => 'Featured Projects',
                'hero_text' => 'Structures that shape communities',
                'description' => 'A portfolio of complex projects delivered on time and budget.',
            ],
        ],
        'small_business' => [
            'hero' => [
                'eyebrow' => 'Business Growth Partners',
                'hero_text' => 'Practical strategy for sustainable growth',
                'description' => 'We help owners build profitable, resilient companies they\'re proud of.',
            ],
            'about' => [
                'eyebrow' => 'Our Approach',
                'hero_text' => 'Real-world experience, not theoretical frameworks',
                'description' => 'Former operators who\'ve sat in your seat and solved these problems.',
            ],
            'services' => [
                'eyebrow' => 'How We Help',
                'hero_text' => 'Hands-on support where it counts',
                'description' => 'Strategy, finance, operations, and execution — not just advice.',
            ],
            'portfolio' => [
                'eyebrow' => 'Client Results',
                'hero_text' => 'Measurable outcomes for real businesses',
                'description' => 'Case studies of owners who transformed their operations.',
            ],
        ],
    ];

    public function definition(): array
    {
        $type = request()->input('business_type', 'software');
        $sectionType = request()->input('section_type', 'hero');
        $catalog = self::$catalogs[$type] ?? self::$catalogs['software'];
        $content = $catalog[$sectionType] ?? $catalog['hero'];

        return [
            'section_id' => null, // Set by seeder
            'eyebrow' => $content['eyebrow'],
            'hero_text' => $content['hero_text'],
            'description' => $content['description'],
            'image_url' => null, // Use placeholder via frontend
        ];
    }

    public static function forBusinessTypeAndSection(string $businessType, string $sectionType): self
    {
        return self::new()->state([
            'business_type' => $businessType,
            'section_type' => $sectionType,
        ]);
    }
}