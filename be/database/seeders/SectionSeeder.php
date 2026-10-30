<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            'Home' => [
                ['section_type' => 'hero', 'title' => 'Welcome to [Your Company]'],
                ['section_type' => 'services', 'title' => null, 'subtitle' => null],
                ['section_type' => 'portofolios', 'title' => 'Our Featured Work'],
            ],
            'About' => [
                ['section_type' => 'hero', 'title' => 'About Us'],
                ['section_type' => 'metrics', 'title' => 'Turning X into Y'],
            ],
            'Services' => [
                ['section_type' => 'hero', 'title' => 'Providing Solution for Your Business'],
                ['section_type' => 'services', 'title' => null, 'subtitle' => null],
            ],
            'Portofolio' => [
                ['section_type' => 'hero', 'title' => 'Selected Works'],
                ['section_type' => 'portofolios', 'title' => null, 'subtitle' => null],
            ],
        ];

        foreach ($pages as $pageName => $sections) {
            $page = Page::where('name', $pageName)->firstOrFail();

            foreach ($sections as $index => $section) {
                Section::factory()->count(1)->create(array_merge([
                    'page_id' => $page->id,
                    'section_type' => $section['section_type'],
                ], $section));
            }
        }
    }
}
