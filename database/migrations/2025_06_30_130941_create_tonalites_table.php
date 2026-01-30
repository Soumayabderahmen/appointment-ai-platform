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
        Schema::create('tonalites', function (Blueprint $table) {
            $table->id();
            $table->float('travaillomane'); 
            $table->float('perseverant');
            $table->float('empathique');
            $table->float('reveur');
            $table->float('promoteur');
            $table->float('rebelle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tonalites');
    }
};
