<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SectionHero extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'eyebrow',
        'image_url',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }
}
