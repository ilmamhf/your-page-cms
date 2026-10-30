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
        Schema::table('website_profiles', function (Blueprint $table) {
            $table->string('theme_primary', 7)->nullable()->after('location');
            $table->string('theme_secondary', 7)->nullable()->after('theme_primary');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('website_profiles', function (Blueprint $table) {
            $table->dropColumn(['theme_primary', 'theme_secondary']);
        });
    }
};
