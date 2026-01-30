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
        Schema::create('n8n_workflow_templates', function (Blueprint $table) {
            $table->id();
   $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('agent_i_a_id')->nullable()->constrained('agent_i_a_s')->onDelete('cascade');

            // Identité côté n8n
            $table->string('workflow_id');   // ID string/uuid de n8n
            $table->string('name');          // Nom stocké (peut venir de tool_title)
            $table->text('description')->nullable();

            // Webhooks
            $table->string('webhook_method', 10)->nullable();
            $table->text('webhook_url')->nullable();
            $table->text('webhook_test_url')->nullable();

            // JSON
            $table->json('contract')->nullable();
            $table->json('tags')->nullable();
            $table->json('params_nodes')->nullable();

            // Contexte projet
            $table->string('project_key')->nullable();   // ex: tag:marketing
            $table->string('project_name')->nullable();
            $table->string('editor_url')->nullable();

            // Saisie manuelle
            $table->string('tool_title')->nullable();
            $table->text('tool_mission')->nullable();

            $table->timestamps();

            // Unicité par user/agent/workflow
            $table->unique(['user_id', 'agent_i_a_id', 'workflow_id'], 'uniq_user_agent_workflow');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('n8n_workflow_templates');
    }
};
