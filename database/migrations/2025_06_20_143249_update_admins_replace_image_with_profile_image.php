<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('admin', function (Blueprint $table) {
            $table->dropColumn('image'); // 🗑️ Supprimer l'ancien champ
            $table->string('profile_image')->nullable(); // ✅ Ajouter le nouveau
        });
    }

    public function down(): void
    {
        Schema::table('', function (Blueprint $table) {
            $table->dropColumn('profile_image');
            $table->string('image')->nullable(); // rollback possible
        });
    }
};
