<?php

namespace App\Http\Controllers\Api\Admin;

use App\Services\N8nClient;
use Illuminate\Http\Request;
use App\Models\N8nWorkflowTemplate;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WorkflowN8NController extends Controller
{
    // GET /api/n8n/projects  → "Mes projets"
    public function indexMyProjects(Request $request, N8nClient $n8n)
    {
        $ownerEmail = $request->query('owner_email', config('services.n8n.owner_email'));
        $ownerId    = $request->query('owner_id',    config('services.n8n.owner_id'));

        // Si tu as un user connecté et pas d'owner configuré
        if (!$ownerEmail && !$ownerId && ($u = $request->user())) {
            $ownerEmail = $u->email;
        }

        $projects = $n8n->listMyProjects($ownerEmail ?: null, $ownerId ?: null);
        return response()->json(['data' => $n8n->mapProjectsForList($projects)]);
    }

    // GET /api/n8n/projects/{projectId}/workflows  → Workflows d'UN de "mes projets"
   public function indexWorkflowsByProject(string $projectId, Request $request, N8nClient $n8n)
{
    $ownerEmail = $request->query('owner_email', config('services.n8n.owner_email'));
    $ownerId    = $request->query('owner_id',    config('services.n8n.owner_id'));
    $onlyActive = $request->has('only_active')
        ? filter_var($request->query('only_active'), FILTER_VALIDATE_BOOLEAN)
        : null;

    $withDetails = $request->boolean('with_details', true);

    if ($withDetails) {
        // Version détaillée : chaque workflow est refetch pour extraire la Sticky Note
        $mapped = $n8n->listWorkflowsByProjectDetailed($projectId);
        return response()->json(['data' => $mapped]);
    }

    // (sinon: version “light” existante)
    $wf = $n8n->listMyWorkflows($ownerEmail ?: null, $ownerId ?: null, $onlyActive, $projectId);
    if (!$wf) {
        $allMine = $n8n->listMyWorkflows($ownerEmail ?: null, $ownerId ?: null, $onlyActive, null);
        $wf = array_values(array_filter($allMine, fn ($w) =>
            (string) ($w['projectId'] ?? '') === $projectId
            || ($projectId === 'personal' && (($w['projectId'] ?? '') === '' || (string) ($w['projectId'] ?? '') === (string) $ownerId))
        ));
    }
    return response()->json(['data' => $n8n->mapWorkflowsForList($wf)]);
}
 public function index(Request $request)
    {
        $userId = $request->user()?->id ?? $request->query('user_id');
        if (!$userId) {
            return response()->json(['message' => 'user_id manquant (ou authentification requise)'], 422);
        }

        $q = N8nWorkflowTemplate::query()->where('user_id', $userId);
        if ($request->filled('agent_id')) {
            $q->where('agent_id', $request->query('agent_id'));
        }

        return response()->json(['data' => $q->orderByDesc('updated_at')->get()]);
    }

    /** DELETE /api/n8n/templates/{id} */
    public function destroy(int $id, Request $request)
    {
        $userId = $request->user()?->id ?? $request->query('user_id');
        if (!$userId) {
            return response()->json(['message' => 'user_id manquant (ou authentification requise)'], 422);
        }

        $tpl = N8nWorkflowTemplate::where('id', $id)->where('user_id', $userId)->first();
        if (!$tpl) {
            return response()->json(['message' => 'Introuvable'], 404);
        }

        $tpl->delete();
        return response()->json(['message' => 'Supprimé']);
    }

public function analyzeUrl(Request $request)
{
    $request->validate([
        'url' => 'required|url'
    ]);

    $n8nWebhook = env('N8N_WEBHOOK_URL');

    // Ici on mappe "url" venant du front → "funding_url" attendu par n8n
    $response = Http::post($n8nWebhook, [
        'funding_url' => $request->url
    ]);

    if ($response->failed()) {
        return response()->json([
            'error' => 'Erreur lors de l’appel à n8n',
            'body'  => $response->body()
        ], 500);
    }

    $json = $response->json();

    if (!$json || empty($json)) {
        return response()->json([
            'error' => 'Réponse vide de n8n',
            'body'  => $response->body()
        ], 500);
    }

    return response()->json($json);
}




}
