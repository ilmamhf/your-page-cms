<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Image and hero detail fields are optional in the CMS (the upload widget
 * clears them to null), so they must accept null in the database.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('social_media', function (Blueprint $table) {
            $table->string('icon_url')->nullable()->change();
        });

        Schema::table('section_heroes', function (Blueprint $table) {
            $table->string('eyebrow')->nullable()->change();
            $table->text('description')->nullable()->change();
            $table->string('image_url')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('social_media', function (Blueprint $table) {
            $table->string('icon_url')->nullable(false)->change();
        });

        Schema::table('section_heroes', function (Blueprint $table) {
            $table->string('eyebrow')->nullable(false)->change();
            $table->text('description')->nullable(false)->change();
            $table->string('image_url')->nullable(false)->change();
        });
    }
};
