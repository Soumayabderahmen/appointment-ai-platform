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
        Schema::create('rag_sources', function (Blueprint $table) {
            $table->id();
            $table->string('type'); 
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('agent_i_a_id')->nullable()->constrained('agent_i_a_s')->onDelete('cascade');
            $table->string('type_label')->nullable();
            $table->string('name')->nullable(); // Nom ou titre
            $table->string('url')->nullable();
            $table->json('config')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rag_sources');
    }
};
