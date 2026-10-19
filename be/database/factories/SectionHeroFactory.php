<?php

namespace Database\Factories;

use App\Models\Section;
use App\Models\SectionHero;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SectionHero>
 */
class SectionHeroFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'section_id' => Section::query()->inRandomOrder()->value('id'),
            'eyebrow' => fake()->sentence(4),
            'hero_text' => fake()->sentence(5),
            'description' => fake()->paragraph(2),
            'image_url' => fake()->imageUrl(640, 480),
        ];
    }
}
