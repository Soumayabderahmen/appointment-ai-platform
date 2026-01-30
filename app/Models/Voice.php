<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Voice extends Model
{
use HasUuids;
    protected $fillable = [
        'user_id',
        'agent_i_a_id',
        'avatar_id',
        'voice_type',
        'voice_name',
         'voice_description',
         'language',
        'settings',
        'file_path',

    ];
     protected $casts = [
        'settings' => 'array',
    ];
}
