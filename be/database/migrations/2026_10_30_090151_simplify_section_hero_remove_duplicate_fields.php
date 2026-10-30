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
        Schema::table('section_heroes', function (Blueprint $table) {
            $table->dropColumn(['hero_text', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('section_heroes', function (Blueprint $table) {
            $table->string('hero_text')->nullable()->after('eyebrow');
            $table->text('description')->nullable()->after('hero_text');
        });
    }
};
