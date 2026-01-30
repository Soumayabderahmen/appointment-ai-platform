<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SousTitre extends Model
{
use HasFactory;

protected $fillable = [
    'titre',
    'agent_i_a_id',
];
    public function agent()
    {
        return $this->belongsTo(AgentIA::class);
    }

    public function responsabilites()
    {
        return $this->hasMany(Responsabilite::class);
    }
}
