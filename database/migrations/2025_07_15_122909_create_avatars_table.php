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
        Schema::create('avatars', function (Blueprint $table) {
            $table->id();
             $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('agent_i_a_id')->nullable()->constrained('agent_i_a_s')->onDelete('cascade');
            $table->string('name');
            $table->string('domain')->nullable();
            $table->text('prompt')->nullable();
              $table->enum('gender', ['male', 'female', 'neutral'])->nullable(); // genre de l'avatar
            $table->enum('body_type', ['full_body', 'generic'])->nullable();   // morphologie
$table->enum('type', [
                'outfit',
                'facemask',
                'hair',
                'glasses',
                'top',
                'facewear',
                'hero_character'
            ])->nullable();

            $table->string('outfit')->nullable();
            $table->string('facemask')->nullable();
            $table->string('hair')->nullable();
            $table->string('glasses')->nullable();
            $table->string('top')->nullable();
            $table->string('facewear')->nullable();
            $table->string('hero_character')->nullable();

            $table->text('system_prompt')->nullable();  
            $table->text('preview_url')->nullable();   
            $table->text('glb_url')->nullable();        
            $table->string('source_image')->nullable(); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avatars');
    }
};
