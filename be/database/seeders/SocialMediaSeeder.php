<?php

namespace Database\Seeders;

use App\Models\SocialMedia;
use Illuminate\Database\Seeder;

class SocialMediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $socialMedias = [
            ['name' => 'Linkedin', 'icon_url' => '', 'link' => 'www.linkedin.com', 'order' => 1, 'website_profile_id' => 1],
            ['name' => 'Instagram', 'icon_url' => '', 'link' => 'www.instagram.com', 'order' => 2, 'website_profile_id' => 1],
            ['name' => 'Facebook', 'icon_url' => '', 'link' => 'www.facebook.com', 'order' => 3, 'website_profile_id' => 1],
        ];

        foreach ($socialMedias as $socMed) {
            SocialMedia::create($socMed);
        }
    }
}
