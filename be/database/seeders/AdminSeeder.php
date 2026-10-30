<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Creates the single CMS admin account.
 *
 * Credentials come from .env (ADMIN_EMAIL / ADMIN_PASSWORD) with dev fallbacks.
 * Registration is disabled in routes/api.php, so this is the only way in.
 */
class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('cms.admin_email');
        $password = config('cms.admin_password');

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'CMS Admin',
                // 'hashed' cast on the model hashes this for us
                'password' => $password,
            ],
        );

        $this->command?->info("Admin ready: {$email}");
    }
}
