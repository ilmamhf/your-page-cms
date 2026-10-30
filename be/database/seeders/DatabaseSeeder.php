<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            PageSeeder::class,
            SectionSeeder::class,
            SectionHeroSeeder::class,
            ServiceSeeder::class,
            PortofolioSeeder::class,
            MetricSeeder::class,
            WebsiteProfileSeeder::class,
            SocialMediaSeeder::class,
        ]);
    }
}
