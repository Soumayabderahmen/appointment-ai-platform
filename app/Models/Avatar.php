<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Avatar extends Model
{
    use HasFactory;
    protected $fillable = [
    'user_id',
    'agent_i_a_id',
    'name',
    'domain',
    'prompt',
    'gender',
    'body_type',
    'types',
    'outfit',
    'facemask',
    'hair',
    'glasses',
    'top',
    'facewear',
    'hero_character',
    'system_prompt',
    'preview_url',
    'glb_url',
    'source_image',
];
public function agentIA()
    {
        return $this->belongsTo(AgentIA::class, 'agent_i_a_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    protected $casts = [
    'types' => 'array',
    ];
    // Dans le modèle Avatar.php
public function getGlbFileUrl()
{
    if ($this->glb_url) {
        // Si c'est un chemin local (commence par 'avatars/')
        if (str_starts_with($this->glb_url, 'avatars/')) {
            return asset('storage/' . $this->glb_url);
        }
        
        // Si c'est encore une URL externe
        return $this->glb_url;
    }
    
    return null;
}

public function hasLocalGlbFile()
{
    if ($this->glb_url && str_starts_with($this->glb_url, 'avatars/')) {
        return Storage::disk('public')->exists($this->glb_url);
    }
    
    return false;
}

}
