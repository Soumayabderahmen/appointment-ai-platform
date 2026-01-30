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
        Schema::create('voices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('agent_i_a_id')->nullable()->constrained('agent_i_a_s')->onDelete('cascade');
            $table->foreignId('avatar_id')->nullable()->constrained('avatars')->onDelete('cascade');
            $table->enum('voice_type',['ia', 'human'])->default('ia');
            $table->string('voice_name')->nullable();
            $table->string('voice_description')->nullable();
            $table->string('language')->nullable();
            $table->json('settings')->nullable();
            $table->string('file_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voices');
    }
};
