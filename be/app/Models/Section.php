<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',
        'title',
        'subtitle',
        'section_type',
        'order',
        'is_active'
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
