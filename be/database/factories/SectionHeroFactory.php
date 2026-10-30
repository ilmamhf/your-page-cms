<?php

namespace Database\Factories;

use App\Models\SectionHero;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionHeroFactory extends Factory
{
    protected $model = SectionHero::class;

    private static array $catalogs = [
        'software' => [
            'hero' => ['eyebrow' => 'Building Digital Products'],
            'about' => ['eyebrow' => 'About Us'],
            'services' => ['eyebrow' => 'Our Expertise'],
            'portfolio' => ['eyebrow' => 'Selected Work'],
        ],
        'creative' => [
            'hero' => ['eyebrow' => 'Design That Communicates'],
            'about' => ['eyebrow' => 'Our Studio'],
            'services' => ['eyebrow' => 'What We Do'],
            'portfolio' => ['eyebrow' => 'Selected Work'],
        ],
        'property' => [
            'hero' => ['eyebrow' => 'Real Estate Excellence'],
            'about' => ['eyebrow' => 'Our Firm'],
            'services' => ['eyebrow' => 'Our Services'],
            'portfolio' => ['eyebrow' => 'Recent Transactions'],
        ],
        'engineering' => [
            'hero' => ['eyebrow' => 'Engineering Excellence'],
            'about' => ['eyebrow' => 'Our Practice'],
            'services' => ['eyebrow' => 'Engineering Services'],
            'portfolio' => ['eyebrow' => 'Featured Projects'],
        ],
        'small_business' => [
            'hero' => ['eyebrow' => 'Business Growth Partners'],
            'about' => ['eyebrow' => 'Our Approach'],
            'services' => ['eyebrow' => 'How We Help'],
            'portfolio' => ['eyebrow' => 'Client Results'],
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
            'image_url' => null,
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