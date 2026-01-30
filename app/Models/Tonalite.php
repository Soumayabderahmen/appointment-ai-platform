<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tonalite extends Model
{
    use HasFactory;

    protected $fillable = [
        'travaillomane', 'perseverant', 'empathique', 'reveur', 'promoteur', 'rebelle'
    ];
  public function agentIAPersonalites()
    {
        return $this->hasMany(AgentIAPersonnalite::class);
    }
   
}
