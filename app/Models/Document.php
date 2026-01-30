<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
     protected $fillable = [
        'agent_i_a_id',
        'title',
        'file_data',
        'file_hash',
        'processed',
    ];
 protected $hidden = ['file_data'];
    protected $casts = [
        'processed' => 'boolean',
    ];
       

     public function agentIA()
    {
        return $this->belongsTo(AgentIA::class, 'agent_i_a_id');
    }
}
