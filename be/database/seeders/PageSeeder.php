<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Page::create([
            'name' => 'Home',
        ]);
        Page::create([
            'name' => 'About',
        ]);
        Page::create([
            'name' => 'Services',
        ]);
        Page::create([
            'name' => 'Portofolio',
        ]);
        Page::create([
            'name' => 'Contact',
        ]);
    }
}
