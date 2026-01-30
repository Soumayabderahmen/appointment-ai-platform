<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentPricing extends Model
{
use HasFactory;

protected $fillable = [
    'agent_i_a_id',
    'std_price',
    'avatar_price',
    'voice_price',
    'apis_price',
    'n8n_price',
    'total_price',
];
public function agentIA()
{
    return $this->belongsTo(AgentIA::class, 'agent_i_a_id');
}
}
