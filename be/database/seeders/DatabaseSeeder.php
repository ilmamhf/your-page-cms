<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Usage:
     *   php artisan db:seed                           # defaults to software
     *   BUSINESS_TYPE=creative php artisan db:seed    # creative agency
     *   BUSINESS_TYPE=property php artisan db:seed    # real estate
     *   BUSINESS_TYPE=engineering php artisan db:seed # engineering firm
     *   BUSINESS_TYPE=small_business php artisan db:seed # small business consultant
     */
    public function run(): void
    {
        $businessType = env('BUSINESS_TYPE', 'software');

        $validTypes = ['software', 'creative', 'property', 'engineering', 'small_business'];

        if (!in_array($businessType, $validTypes)) {
            $this->command?->error("Invalid business type: {$businessType}. Valid types: " . implode(', ', $validTypes));
            $businessType = 'software';
        }

        BusinessTypeAwareSeeder::setBusinessType($businessType);
        $this->call(BusinessTypeAwareSeeder::class);
    }
}