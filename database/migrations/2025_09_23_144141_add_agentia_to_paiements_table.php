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
        Schema::table('paiements', function (Blueprint $table) {
 $table->foreignId('agent_i_a_id')
                  ->nullable()
                  ->constrained('agent_i_a_s')
                  ->onDelete('cascade');
        });
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paiements', function (Blueprint $table) {
$table->dropForeign(['agent_i_a_id']);
            $table->dropColumn('agent_i_a_id');        });
    }
};
