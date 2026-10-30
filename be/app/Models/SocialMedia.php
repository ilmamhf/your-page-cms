<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialMedia extends Model
{
    protected $fillable = [
        'name',
        'icon_url',
        'link',
        'order',
        'website_profile_id',
    ];

    public function websiteProfile(): BelongsTo
    {
        return $this->belongsTo(WebsiteProfile::class, 'website_profile_id');
    }
}
