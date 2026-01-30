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
      Schema::create('fundings', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
          ->constrained()
        
          ->onDelete('cascade')
            ->nullable(); 

    $table->string('title')->nullable();
    $table->string('funding_type')->nullable();
    $table->longText('description')->nullable();
    $table->string('operator')->nullable();
    $table->string('geographic_scope')->nullable();
    $table->json('sectors')->nullable();
    $table->string('keywords')->nullable();
    $table->json('beneficiaries')->nullable();
    $table->string('project_stage')->nullable();
    $table->string('eligibility_status')->nullable();
    $table->integer('amount_min')->nullable();
    $table->integer('amount_max')->nullable();
    $table->integer('coverage_rate')->nullable();
    $table->date('open_date')->nullable();
    $table->date('close_date')->nullable();
    $table->string('instruction_delay')->nullable();
    $table->string('application_link')->nullable();
    $table->string('operator_contact')->nullable();
    $table->json('application_steps')->nullable();
    $table->json('deliverables')->nullable();
    $table->longText('internal_notes')->nullable();
    $table->string('operator_logo')->nullable();
    $table->string('cover_banner')->nullable();
    $table->string('seo_slug')->nullable();
    $table->string('seo_meta_title')->nullable();
    $table->longText('seo_meta_description')->nullable();
    $table->boolean('seo_indexation')->default(true);

    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fundings');
    }
};
