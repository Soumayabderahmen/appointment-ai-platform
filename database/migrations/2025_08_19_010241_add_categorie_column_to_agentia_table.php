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
        Schema::table('agent_i_a_s', function (Blueprint $table) {
           $table->foreignId('category_id')
                  ->nullable()
                  ->constrained('categories')
                  ->cascadeOnUpdate()
                  ->nullOnDelete();

            $table->foreignId('subcategory_id')
                  ->nullable()
                  ->constrained('sub_categories')
                  ->cascadeOnUpdate()
                  ->nullOnDelete();

            // (Optionnel) index combiné si tu fais souvent des filtres sur les 2
            $table->index(['category_id', 'subcategory_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('agent_i_a_s', function (Blueprint $table) {
           $table->dropConstrainedForeignId('subcategory_id');
            $table->dropConstrainedForeignId('category_id');
            $table->dropIndex(['category_id', 'subcategory_id']);
        });
    }
};
