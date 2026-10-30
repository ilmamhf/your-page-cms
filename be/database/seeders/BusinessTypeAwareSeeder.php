<?php

namespace Database\Seeders;

use App\Models\Metric;
use App\Models\Page;
use App\Models\Portofolio;
use App\Models\Section;
use App\Models\SectionHero;
use App\Models\Service;
use App\Models\SocialMedia;
use App\Models\User;
use App\Models\WebsiteProfile;
use Database\Factories\MetricFactory;
use Database\Factories\PortofolioFactory;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusinessTypeAwareSeeder extends Seeder
{
    private static string $businessType = 'software';
    private string $currentBusinessType = 'software';

    public static function setBusinessType(string $type): void
    {
        self::$businessType = $type;
    }

    private array $businessConfigs = [
        'software' => [
            'name' => 'CodeCraft Studios',
            'email' => 'hello@codecraft.studio',
            'phone' => '+1 (555) 123-4567',
            'location' => 'San Francisco, CA / Remote',
            'social' => [
                ['name' => 'GitHub', 'link' => 'https://github.com/codecraft', 'icon' => 'github'],
                ['name' => 'Twitter', 'link' => 'https://twitter.com/codecraft', 'icon' => 'twitter'],
                ['name' => 'LinkedIn', 'link' => 'https://linkedin.com/company/codecraft', 'icon' => 'linkedin'],
            ],
            'pages' => [
                'Home' => ['hero', 'services', 'portofolios'],
                'About' => ['hero', 'metrics'],
                'Services' => ['hero', 'services'],
                'Work' => ['hero', 'portofolios'],
                'Contact' => ['hero'],
            ],
        ],
        'creative' => [
            'name' => 'Studio Maven',
            'email' => 'work@studiomaven.co',
            'phone' => '+1 (555) 987-6543',
            'location' => 'Brooklyn, NY',
            'social' => [
                ['name' => 'Instagram', 'link' => 'https://instagram.com/studiomaven', 'icon' => 'instagram'],
                ['name' => 'Dribbble', 'link' => 'https://dribbble.com/studiomaven', 'icon' => 'dribbble'],
                ['name' => 'LinkedIn', 'link' => 'https://linkedin.com/company/studiomaven', 'icon' => 'linkedin'],
            ],
            'pages' => [
                'Home' => ['hero', 'services', 'portofolios'],
                'About' => ['hero', 'metrics'],
                'Services' => ['hero', 'services'],
                'Work' => ['hero', 'portofolios'],
                'Contact' => ['hero'],
            ],
        ],
        'property' => [
            'name' => 'Meridian Real Estate',
            'email' => 'info@meridianre.com',
            'phone' => '+1 (555) 456-7890',
            'location' => 'Austin, TX',
            'social' => [
                ['name' => 'LinkedIn', 'link' => 'https://linkedin.com/company/meridianre', 'icon' => 'linkedin'],
                ['name' => 'Facebook', 'link' => 'https://facebook.com/meridianre', 'icon' => 'facebook'],
                ['name' => 'Instagram', 'link' => 'https://instagram.com/meridianre', 'icon' => 'instagram'],
            ],
            'pages' => [
                'Home' => ['hero', 'services', 'portofolios'],
                'About' => ['hero', 'metrics'],
                'Services' => ['hero', 'services'],
                'Listings' => ['hero', 'portofolios'],
                'Contact' => ['hero'],
            ],
        ],
        'engineering' => [
            'name' => 'Apex Engineering Group',
            'email' => 'contact@apexeng.com',
            'phone' => '+1 (555) 321-0987',
            'location' => 'Denver, CO',
            'social' => [
                ['name' => 'LinkedIn', 'link' => 'https://linkedin.com/company/apexeng', 'icon' => 'linkedin'],
                ['name' => 'Twitter', 'link' => 'https://twitter.com/apexeng', 'icon' => 'twitter'],
            ],
            'pages' => [
                'Home' => ['hero', 'services', 'portofolios'],
                'About' => ['hero', 'metrics'],
                'Services' => ['hero', 'services'],
                'Projects' => ['hero', 'portofolios'],
                'Contact' => ['hero'],
            ],
        ],
        'small_business' => [
            'name' => 'Growth Partners Co.',
            'email' => 'hello@growthpartners.co',
            'phone' => '+1 (555) 789-0123',
            'location' => 'Chicago, IL',
            'social' => [
                ['name' => 'LinkedIn', 'link' => 'https://linkedin.com/company/growthpartners', 'icon' => 'linkedin'],
                ['name' => 'Twitter', 'link' => 'https://twitter.com/growthpartners', 'icon' => 'twitter'],
                ['name' => 'Facebook', 'link' => 'https://facebook.com/growthpartners', 'icon' => 'facebook'],
            ],
            'pages' => [
                'Home' => ['hero', 'services', 'portofolios'],
                'About' => ['hero', 'metrics'],
                'Services' => ['hero', 'services'],
                'Results' => ['hero', 'portofolios'],
                'Contact' => ['hero'],
            ],
        ],
    ];

    public function run(): void
    {
        $this->currentBusinessType = self::$businessType;
        $config = $this->businessConfigs[$this->currentBusinessType] ?? $this->businessConfigs['software'];

        $this->command?->info("Seeding for business type: {$this->currentBusinessType} ({$config['name']})");

        // Clear existing data (in correct order due to foreign keys)
        SectionHero::truncate();
        Section::truncate();
        Page::truncate();
        Service::truncate();
        Portofolio::truncate();
        Metric::truncate();
        SocialMedia::truncate();
        WebsiteProfile::truncate();
        // Keep admin user, delete others
        User::where('email', '!=', 'admin@example.com')->delete();
        // Ensure admin exists
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::factory()->create([
                'name' => 'CMS Admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        // 2. Website Profile
        $profile = WebsiteProfile::create([
            'name' => $config['name'],
            'email' => $config['email'],
            'phone_number' => $config['phone'],
            'location' => $config['location'],
        ]);

        // 3. Social Media
        foreach ($config['social'] as $index => $social) {
            SocialMedia::create([
                'website_profile_id' => $profile->id,
                'name' => $social['name'],
                'link' => $social['link'],
                'icon_url' => null,
                'order' => $index,
            ]);
        }

        // 4. Pages
        $pages = [];
        foreach ($config['pages'] as $pageName => $sectionTypes) {
            $page = Page::create([
                'name' => $pageName,
            ]);
            $pages[$pageName] = $page;
        }

        // 5. Sections with SectionHero data
        $sectionOrder = 0;
        foreach ($config['pages'] as $pageName => $sectionTypes) {
            $page = $pages[$pageName];
            foreach ($sectionTypes as $index => $sectionType) {
                $section = Section::create([
                    'page_id' => $page->id,
                    'title' => $this->getSectionTitle($sectionType, $pageName),
                    'subtitle' => $this->getSectionSubtitle($sectionType),
                    'section_type' => $sectionType,
                    'order' => $sectionOrder++,
                    'is_active' => true,
                ]);

                // Create hero detail for hero and metrics sections
                if (in_array($sectionType, ['hero', 'metrics'])) {
                    SectionHero::create([
                        'section_id' => $section->id,
                        'eyebrow' => $this->getHeroEyebrow($sectionType, $pageName),
                        'hero_text' => $this->getHeroText($sectionType, $pageName),
                        'description' => $this->getHeroDescription($sectionType, $pageName),
                        'image_url' => null,
                    ]);
                }
            }
        }

        // 6. Services (6 items)
        ServiceFactory::setBusinessType($this->currentBusinessType);
        Service::factory()->count(6)->create();

        // 7. Portfolio (5 items)
        PortofolioFactory::setBusinessType($this->currentBusinessType);
        Portofolio::factory()->count(5)->create();

        // 8. Metrics (4 items)
        MetricFactory::setBusinessType($this->currentBusinessType);
        Metric::factory()->count(4)->create();

        $this->command?->info('Seeding completed successfully!');
    }

    private function getSectionTitle(string $sectionType, string $pageName): ?string
    {
        if ($sectionType !== 'hero') {
            return match ($sectionType) {
                'services' => 'Our Services',
                'portofolios' => 'Selected Work',
                'metrics' => 'By the Numbers',
                default => null,
            };
        }
        return null;
    }

    private function getSectionSubtitle(string $sectionType): ?string
    {
        return match ($sectionType) {
            'services' => 'Capabilities that deliver measurable outcomes',
            'portofolios' => 'A curated selection of our recent work',
            'metrics' => 'Results that speak for themselves',
            default => null,
        };
    }

    private function getHeroEyebrow(string $sectionType, string $pageName): string
    {
        $config = $this->businessConfigs[$this->currentBusinessType];
        return match ($pageName) {
            'Home' => $sectionType === 'hero' ? 'Welcome to ' . $config['name'] : 'Our Impact',
            'About' => $sectionType === 'hero' ? 'About Us' : 'Our Track Record',
            'Services' => 'What We Offer',
            'Work', 'Listings', 'Projects', 'Results' => 'Featured Work',
            'Contact' => 'Get in Touch',
            default => 'Welcome',
        };
    }

    private function getHeroText(string $sectionType, string $pageName): string
    {
        $config = $this->businessConfigs[$this->currentBusinessType];
        return match ($pageName) {
            'Home' => $sectionType === 'hero'
                ? 'We craft ' . $this->getBusinessDescriptor() . ' that drive growth'
                : 'Measurable results for ambitious teams',
            'About' => $sectionType === 'hero'
                ? 'About ' . $config['name']
                : 'Our track record in numbers',
            'Services' => 'Expertise tailored to your challenges',
            'Work', 'Listings', 'Projects', 'Results' => 'Work we\'re proud to share',
            'Contact' => 'Let\'s start a conversation',
            default => $config['name'],
        };
    }

    private function getHeroDescription(string $sectionType, string $pageName): string
    {
        return match ($pageName) {
            'Home' => $sectionType === 'hero'
                ? 'We partner with forward-thinking organizations to build ' . strtolower($this->getBusinessDescriptor()) . ' that solve real problems.'
                : 'Every project is a partnership. We measure success by your outcomes.',
            'About' => $sectionType === 'hero'
                ? 'Founded on the belief that ' . strtolower($this->getBusinessDescriptor()) . ' should be both excellent and accessible.'
                : 'Data points that reflect our commitment to client success.',
            'Services' => 'Each engagement is customized. No templates, no handoffs — just results.',
            'Work', 'Listings', 'Projects', 'Results' => 'Each project represents a unique challenge solved.',
            'Contact' => 'Ready to explore what\'s possible? We\'d love to hear about your project.',
            default => 'Discover what we can do together.',
        };
    }

    private function getBusinessDescriptor(): string
    {
        return match ($this->currentBusinessType) {
            'software' => 'software',
            'creative' => 'creative solutions',
            'property' => 'real estate solutions',
            'engineering' => 'engineering solutions',
            'small_business' => 'growth strategies',
            default => 'solutions',
        };
    }
}