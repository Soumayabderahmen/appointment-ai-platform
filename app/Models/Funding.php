<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Funding extends Model
{
    use HasFactory;

    protected $fillable = [
                'user_id',

        'title', 'funding_type', 'description', 'operator',
        'geographic_scope', 'sectors', 'keywords', 'beneficiaries',
        'project_stage', 'eligibility_status', 'amount_min', 'amount_max',
        'coverage_rate', 'open_date', 'close_date', 'instruction_delay',
        'application_link', 'operator_contact', 'application_steps',
        'deliverables', 'internal_notes', 'operator_logo', 'cover_banner',
        'seo_slug', 'seo_meta_title', 'seo_meta_description', 'seo_indexation'
    ];

    protected $casts = [
        'sectors' => 'array',
        'beneficiaries' => 'array',
        'application_steps' => 'array',
        'deliverables' => 'array',
        'seo_indexation' => 'boolean',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

