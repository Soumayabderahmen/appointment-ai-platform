<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RagSource extends Model
{
use HasFactory;
protected $fillable = [
        'type',
        'type_label',
        'agent_i_a_id',
         'user_id',
        'name',
        'url',  
        'config',
        'statut'
];
 protected $casts = [
        'config' => 'array'
    ];
    public function agentIA()
    {
        return $this->belongsTo(AgentIA::class, 'agent_i_a_id');
    }
     public function user()
    {
        return $this->belongsTo(User::class);
    }
     public function getIsFileAttribute(): bool
    {
        return $this->type === 'file';
    }

    public function getIsUrlAttribute(): bool
    {
        return $this->type === 'url';
    }

    public function scopeOfType($q, string $type)
    {
        return $q->where('type', $type);
    }
}
