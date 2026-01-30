<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategorie extends Model
{
  use HasFactory;

    protected $fillable = [
        'name',
        'category_id',
    ];
    public function category()
    {
        return $this->belongsTo(Categorie::class, 'category_id');
    }
     public function agents()
    {
        return $this->hasMany(AgentIA::class, 'subcategory_id');
    }
}
