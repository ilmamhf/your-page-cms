<?php

return [

    /*
    |--------------------------------------------------------------------------
    | CMS Admin Account
    |--------------------------------------------------------------------------
    |
    | The single account that can log in to the admin CMS. Registration is
    | disabled, so these values (set in .env) are the only way to get access.
    |
    */

    'admin_email' => env('ADMIN_EMAIL', 'admin@example.com'),

    'admin_password' => env('ADMIN_PASSWORD', 'password'),

];
