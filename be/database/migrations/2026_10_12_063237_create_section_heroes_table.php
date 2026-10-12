<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('section_heroes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('section_id')->constrained('sections')->onDelete("cascade");
            $table->string('eyebrow');
            $table->string('hero_text');
            $table->text('description');
            $table->string('image_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_heroes');
    }
};
