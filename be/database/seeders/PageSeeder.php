<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = ['Home', 'About', 'Services', 'Portofolio'];

        foreach ($pages as $page) {
            Page::create([
                'name' => $page,
            ]);
        }
    }
}
