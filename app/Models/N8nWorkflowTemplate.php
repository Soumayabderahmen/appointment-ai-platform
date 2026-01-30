<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class N8nWorkflowTemplate extends Model
{
    protected $fillable = [
        'user_id','agent_i_a_id','workflow_id','name','description',
        'webhook_method','webhook_url','webhook_test_url',
        'contract','tags','params_nodes','project_key','project_name','editor_url',
        'tool_title','tool_mission',
    ];

    protected $casts = [
        'contract'     => 'array',
        'tags'         => 'array',
        'params_nodes' => 'array',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(\App\Models\User::class);
    }

    // Adapte si ton modèle s’appelle autrement
    public function agent(): BelongsTo {
        return $this->belongsTo(\App\Models\Agent::class, 'agent_id');
    }
}
