<?php

namespace Database\Seeders;

use App\Models\WebsiteProfile;
use Illuminate\Database\Seeder;

class WebsiteProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WebsiteProfile::create([
            'name' => 'Your Company',
            'email' => 'your@company.com',
            'location' => 'Merdeka Square, Jakarta, Jalan Lapangan Monas, RT.5/RW.2, Gambir, Central Jakarta City, Jakarta 10110',
        ]);
    }
}
