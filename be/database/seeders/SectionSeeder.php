<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Section;
use App\Models\Page;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = ['Home', 'About', 'Services', 'Portofolio', 'Contact'];

        foreach ($pages as $pageName) {
            $page = Page::where('name', $pageName)->firstOrFail();

            Section::factory()
                ->count(1)
                ->create([
                    'page_id' => $page->id,
                    'section_type' => 'hero'
                ]);

            Section::factory()
                ->count(2)
                ->create([
                    'page_id' => $page->id,
                ]);
        }
    }
}
