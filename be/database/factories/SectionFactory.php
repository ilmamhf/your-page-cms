<?php

namespace Database\Factories;

use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Section>
 */
class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'subtitle' => fake()->paragraph(5),
            'section_type' => fake()->randomElement(['services', 'portofolios', 'metrics']),
            'order' => fake()->unique()->numberBetween(1, 9999),
            'is_active' => fake()->boolean(100),
        ];
    }
}
