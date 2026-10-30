<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WebsiteProfile extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'location',
        'theme_primary',
        'theme_secondary',
    ];

    public function socialMedias(): HasMany
    {
        return $this->hasMany(SocialMedia::class, 'website_profile_id');
    }
}
