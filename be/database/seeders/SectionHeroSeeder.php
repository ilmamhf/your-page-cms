<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SectionHero;
use App\Models\Section;

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
            ]);
        }
    }
}
