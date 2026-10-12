<?php

namespace Database\Factories;

use App\Models\Page;
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
    private static int $order = 1;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(6),
            'subtitle' => fake()->paragraph(3),
            'section_type' => fake()->randomElement(['services', 'portofolios', 'metrics']),
            'order' => self::$order++,
            'is_active' => fake()->boolean(50)
        ];
    }
}
