<?php

namespace Database\Factories;

use App\Models\Metric;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Metric>
 */
class MetricFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    private static int $order = 0;

    public function definition(): array
    {
        return [
            'label' => fake()->sentence(1),
            'value' => fake()->randomFloat(0, 3, 300),
            'suffix' => fake()->randomElement(['+', '+-', '']),
            'order' => self::$order++,
            'is_active' => fake()->boolean(70),
        ];
    }
}
