<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgentIA extends Model
{
  protected $fillable = [
        'nom', 'description','tags', 'type','user_id','category_id', 'subcategory_id',
    ];
protected $casts = [
        'tags' => 'array',
    ];

    public function sousTitres()
    {
        return $this->hasMany(SousTitre::class);
    }
     public function personnalite()
    {
        return $this->hasOne(AgentIAPersonnalite::class, 'agent_i_a_id'); 
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function avatar()
{
    return $this->hasOne(Avatar::class);
}
  public function category()
    {
        return $this->belongsTo(Categorie::class, 'category_id');
    }

    public function subcategory()
    {
        return $this->belongsTo(SubCategorie::class, 'subcategory_id');
    }
    public function pricing()
{
    return $this->hasOne(AgentPricing::class);
}

}



