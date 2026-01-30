<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
use HasFactory;
    protected $fillable = [
        'name',
       
    ];

    public function subCategories()
    {
        return $this->hasMany(SubCategorie::class, 'category_id');
            }
            public function agents()
    {
        return $this->hasMany(AgentIA::class, 'category_id');
    }
}
