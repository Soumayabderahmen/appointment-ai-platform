<?php

namespace App\Http\Controllers\Api\AgentIA;

use App\Models\RagSource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RagSourceController extends Controller
{

public function index(Request $request, $agentId)
{
    $userId = $request->user()?->id; 
    $ownOnly = (bool) $request->boolean('own', false);

    // 1) PDFs depuis documents (juste meta infos, pas d’URL)
    $docs = DB::table('documents')
        ->select([
            'id',
            'agent_i_a_id',
            'title',
            'processed',
            'created_at',
            DB::raw('OCTET_LENGTH(file_data) AS size_bytes'),
        ])
        ->when($agentId, fn($q) => $q->where('agent_i_a_id', $agentId))
        ->orderBy('created_at','desc')
        ->get()
        ->map(function ($d) {
            return [
                'id'         => (int) $d->id,
                'type'       => 'file',
                'typeLabel'  => 'PDF',
                'name'       => $d->title ?: ('document-'.$d->id.'.pdf'),
                'url'        => null, // pas de lien cliquable
                'size'       => (int) ($d->size_bytes ?? 0),
                'created_at' => optional($d->created_at)->toDateTimeString(),
                'status'     => $d->processed
                    ? ['key' => 'indexed', 'label' => 'Indexé']
                    : ['key' => 'running', 'label' => 'En cours'],
            ];
        });

    // 2) Autres sources depuis rag_sources
    $sources = RagSource::query()
        ->when($agentId, fn($q) => $q->where('agent_i_a_id', $agentId))
        ->when($ownOnly && $userId, fn($q) => $q->where('user_id', $userId))
        ->orderBy('created_at','desc')
        ->get()
        ->map(function ($s) {
            $label = $s->type_label ?: match($s->type) {
                'url'      => 'URL',
                'api'      => 'API',
                'internal' => 'Données internes',
                'note'     => 'Note',
                'notion'   => 'Notion',
                default    => 'Source',
            };

            $status = $s->statut
                ? ['key' => 'indexed', 'label' => 'Indexé']
                : ['key' => ($s->type === 'api' ? 'connected' : 'running'),
                   'label' => ($s->type === 'api' ? 'Connecté'   : 'En cours')];

            return [
                'id'         => (int) $s->id,
                'type'       => $s->type,
                'typeLabel'  => $label,
                'name'       => $s->name ?: $label,
                'url'        => $s->url ?: null,
                'size'       => null,
                'created_at' => optional($s->created_at)->toDateTimeString(),
                'status'     => $status,
            ];
        });

    // 3) Fusion
    $merged = $docs->concat($sources)
        ->sortByDesc('created_at')
        ->values()
        ->all();

    return response()->json($merged);
}

}
