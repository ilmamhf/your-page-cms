<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
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
            'title' => fake()->sentence(3),
            'description' => fake()->sentence(5),
            'icon_url' => fake()->imageUrl(640, 480),
            'order' => self::$order++,
            'is_active' => fake()->boolean(50)
        ];
    }
}
