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
        Schema::create('agent_i_a_personnalites', function (Blueprint $table) {
            $table->id();
            $table->string('role');
            $table->text('mission');
            $table->foreignId('tonalite_id')->constrained('tonalites')->onDelete('cascade');
            $table->enum('style_reponse', ['Synthetique', 'Detailee', 'Schematique']); 
            $table->text('contraintes_specifiques')->nullable();
            $table->text('prompt_systeme')->nullable();
            $table->foreignId('agent_i_a_id')->constrained('agent_i_a_s')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_i_a_personnalites');
    }
};
