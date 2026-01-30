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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();        
            $table->string('file_hash', 128)->unique()->nullable(); 

             $table->foreignId('agent_i_a_id')->nullable()->constrained('agent_i_a_s')->onDelete('cascade');
            $table->binary('file_data')->nullable();   

       
            $table->boolean('processed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
