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
        Schema::create('responsabilites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sous_titre_id')->constrained('sous_titres')->onDelete('cascade');
            $table->string('responsabilite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responsabilites');
    }
};
