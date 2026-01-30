<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentIAPersonnalite extends Model
{
   use HasFactory;
    protected $fillable = [
          'role', 'mission',  'style_reponse', 'contraintes_specifiques', 'prompt_systeme','agent_i_a_id','tonalite_id'
     ];
    
     public function agentIA()
     {
          return $this->belongsTo(AgentIA::class);
     }
       public function tonalite()
    {
        return $this->belongsTo(Tonalite::class);
    }
}
