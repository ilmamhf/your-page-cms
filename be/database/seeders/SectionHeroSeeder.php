<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\SectionHero;
use Illuminate\Database\Seeder;

class SectionHeroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = Section::where('section_type', 'hero')
            ->doesntHave('hero')
            ->get();

        foreach ($sections as $section) {
            SectionHero::factory()->create([
                'section_id' => $section->id,
                'hero_text' => $section->title,
            ]);
        }
    }
}
