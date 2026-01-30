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
        Schema::create('agent_pricings', function (Blueprint $table) {
     $table->id();
    $table->foreignId('agent_i_a_id')->nullable()->constrained('agent_i_a_s')->onDelete('cascade');
    $table->decimal('std_price', 8, 2)->default(0);
    $table->decimal('avatar_price', 8, 2)->default(0);
    $table->decimal('voice_price', 8, 2)->default(0);
    $table->decimal('apis_price', 8, 2)->default(0);
    $table->decimal('n8n_price', 8, 2)->default(0);
    $table->decimal('total_price', 8, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_pricings');
    }
};
