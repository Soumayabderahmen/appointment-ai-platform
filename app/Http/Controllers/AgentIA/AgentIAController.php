<?php

namespace App\Http\Controllers\AgentIA;

use App\Models\AgentIA;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\RagSource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AgentIAController extends Controller
{



public function agentia()
    {
        $userId = Auth::id();

        // MES AGENTS
        $mesagents = AgentIA::with(['avatar:id,agent_i_a_id,glb_url','category:id,name'])
            ->select('id','user_id','nom','type','description','category_id','subcategory_id','created_at')
            ->where('user_id', $userId)
            ->latest()
            ->get()
            ->map(fn ($a) => $this->mapAgent($a));

        // MARKETPLACE: tous les agents PUBLICS
        $marketplaceAgents = AgentIA::with(['avatar:id,agent_i_a_id,glb_url','category:id,name','pricing:id,agent_i_a_id,total_price'
])
            ->select('id','user_id','nom','type','description','category_id','subcategory_id','created_at')
            ->where(function($q){
                // adapte ce filtre selon ton schéma ("type", "visibility", booléen…)
                $q->where('type', 'public')->orWhere('type', 'Public')->orWhere('type', 'PUBLIC');
            })
            ->latest()
            ->get()
            ->map(fn ($a) => $this->mapAgent($a));

        // KPI
        $kpi_total_all  = AgentIA::count();
        $kpi_total_mine = $mesagents->count();
        $kpi_sales_rate = null; // calcule-le si tu as des ventes

        $categories = Categorie::select('id','name')->orderBy('name')->get();

        return view('agent-ia.index', compact(
            'mesagents',
            'marketplaceAgents',
            'categories',
            'kpi_total_all',
            'kpi_total_mine',
            'kpi_sales_rate'
        ));
    }

private function mapAgent(AgentIA $a)
    {
        // avatar_url fiable
        $path = $a->avatar->glb_url ?? null;
        if ($path) {
            // si glb_url = 'public/avatars/xxx.glb' ou 'avatars/xxx.glb', Storage::url gère
            $path = str_replace('\\','/',$path);
            $path = preg_replace('#^/?storage/app/public/#','',$path);
            $path = preg_replace('#^/?public/#','',$path);
            $path = ltrim($path,'/');
            $a->avatar_url = Storage::url($path); // => /storage/avatars/xxx.glb (respecte config)
        } else {
            $a->avatar_url = null;
        }

        // alias compatibles avec le front
        $a->name        = $a->nom;
        $a->visibility  = $a->type;
        $a->category    = $a->category ?? null; // si relation

         $a->price_startup = $a->pricing->price_startup ?? null;
    $a->total_price   = $a->pricing->total_price ?? null;

        return $a;
    }

     public function addAgentia()
     {
       $categories = Categorie::select('id','name')
        ->with(['subcategories:id,category_id,name'])
        ->orderBy('name')
        ->get();

    return view('agent-ia.add', compact('categories'));
     }
   public function detailsAgentia(AgentIA $agent)
{
    // relations de base
    $agent->load(['avatar:id,agent_i_a_id,glb_url','category:id,name','subcategory:id,name']);

    // auteur connecté ?
    $isOwner = Auth::id() === $agent->user_id;

    // URL avatar
    $path = $agent->avatar->glb_url ?? null;
    if ($path) {
        $path = str_replace('\\','/',$path);
        $path = preg_replace('#^/?(storage/app/public|public)/#','',$path);
        $path = ltrim($path,'/');
        $agent->avatar_url = Storage::url($path);
    } else {
        $agent->avatar_url = null;
    }

    // fallbacks d'affichage
    $agent->display_name = $agent->nom ?? $agent->name ?? 'Agent IA';
    $agent->greeting     = $agent->greeting ?? ('Bonjour! Je suis '.$agent->display_name);
    $agent->type         = $agent->type ?? 'Agent IA';
    $agent->role         = $agent->role ?? (optional($agent->category)->name ?? '—');
    $agent->description  = $agent->description ?? '';
    if (!is_array($agent->tags ?? null)) {
        $agent->tags = $agent->tags ? preg_split('/\s*[,;]\s*/', $agent->tags) : [];
    }

    /** ---------- SOURCES : RAG + DOCUMENTS ---------- */

    // 1) RAG sources (file/url/api...)
    $rag = RagSource::where('agent_i_a_id', $agent->id)
        ->orderByDesc('created_at')
        ->get(['id','type','type_label','name','url','config','created_at']);

    // 2) Documents (on récupère la taille en bytes sans charger le blob en PHP)
    $driver = config('database.default');
    $lengthExpr = match ($driver) {
        'mysql'  => 'OCTET_LENGTH(file_data)',
        'pgsql'  => 'octet_length(file_data)',
        'sqlite' => 'length(file_data)',
        'sqlsrv' => 'DATALENGTH(file_data)',
        default  => 'OCTET_LENGTH(file_data)',
    };

    $docs = Document::where('agent_i_a_id', $agent->id)
        ->orderByDesc('created_at')
        ->select('id','title','file_hash','processed','created_at', DB::raw("$lengthExpr as bytes"))
        ->get();

    // helper taille lisible
    $human = function (?int $bytes): ?string {
        if ($bytes === null) return null;
        $units = ['B','KB','MB','GB','TB'];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units)-1) { $bytes /= 1024; $i++; }
        return number_format($bytes, $bytes < 10 && $i ? 1 : 0).' '.$units[$i];
    };

    // mapping RAG
    $sources = [];
    foreach ($rag as $s) {
        $label = $s->type_label ?: match (strtolower($s->type)) {
            'file' => 'Fichier', 'url' => 'URL', 'api' => 'API', default => ucfirst($s->type)
        };
        $name  = $s->name ?: ($s->url ?? '—');
        $bytes = data_get($s->config, 'bytes') ?? data_get($s->config, 'size_bytes');

        $sources[] = [
            'origin'       => 'rag',
            'type'         => $label,
            'name'         => $name,
            'added_at'     => optional($s->created_at)->toDateString(),
            'size'         => $bytes ? $human((int)$bytes) : null,
            'url'          => $s->url,     // ex: lien direct si URL, ou chemin de fichier si tu l’as
            'download_url' => null,
            'id'           => $s->id,
        ];
    }

    // mapping Documents
    foreach ($docs as $d) {
        $sources[] = [
            'origin'       => 'document',
            'type'         => 'Document',
            'name'         => $d->title ?: ('Document #'.$d->id),
            'added_at'     => optional($d->created_at)->toDateString(),
            'size'         => $d->bytes ? $human((int)$d->bytes) : null,
            'url'          => null,
            // si tu as une route de téléchargement, décommente :
            // 'download_url' => route('documents.download', $d),
            'download_url' => null,
            'id'           => $d->id,
        ];
    }

    // tri final par date décroissante
    usort($sources, fn($a,$b) => strcmp($b['added_at'] ?? '', $a['added_at'] ?? ''));

    return view('agent-ia.details', [
        'agent'    => $agent,
        'isOwner'  => $isOwner,
        'sources'  => $sources, // <<<<<<<<<<<<<<<<
        // 'addSourceUrl' => route('agentia.sources.create', $agent), // si tu as la route
    ]);
}
}