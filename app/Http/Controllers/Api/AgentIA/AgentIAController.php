<?php

namespace App\Http\Controllers\Api\AgentIA;

use App\Models\Voice;
use App\Models\Avatar;
use App\Models\AgentIA;
use App\Models\Document;
use App\Models\Tonalite;
use App\Models\RagSource;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AgentIAController extends Controller
{
    
 
public function store(Request $request)
{
    // --- Helpers locaux ---
    $sanitizeUtf8 = function ($value) use (&$sanitizeUtf8) {
        if (is_string($value)) {
            $enc = mb_detect_encoding($value, ['UTF-8','Windows-1252','ISO-8859-1'], true) ?: 'UTF-8';
            $value = @iconv($enc, 'UTF-8//IGNORE', $value);
            return preg_replace('/[\x00-\x1F\x7F]/u', '', $value);
        }
        if (is_array($value)) {
            foreach ($value as $k => $v) $value[$k] = $sanitizeUtf8($v);
            return $value;
        }
        if ($value instanceof \Stringable) return $sanitizeUtf8((string)$value);
        return $value;
    };
    $cleanUploadedName = function (\Illuminate\Http\UploadedFile $f) use ($sanitizeUtf8) {
        $name = $sanitizeUtf8($f->getClientOriginalName());
        $name = str_replace(['\\','/'], '-', $name);
        return trim($name);
    };

    $request->validate([
        // Agent IA
        'nom' => 'required|string|max:255',
        'description' => 'required|string',
        'type' => 'required|in:public,privé',
        'tags' => 'nullable|array',
        'tags.*' => 'string',
        'sous_titres' => 'required|array',
        'sous_titres.*.titre' => 'required|string|max:255',
        'sous_titres.*.responsabilites' => 'required|array',
        'sous_titres.*.responsabilites.*' => 'required|string',
        'category_id'   => ['required','integer','exists:categories,id'],
        'subcategory_id'=> [
            'required','integer',
            Rule::exists('sub_categories','id')->where(fn($q) =>
                $q->where('category_id', $request->integer('category_id'))
            ),
        ],

        // Personnalité
        'role' => 'required|string|max:255',
        'mission' => 'required|string|max:255',
        'style_reponse' => 'required|string|in:Synthetique,Detailee,Schematique',
        'contraintes_specifiques' => 'nullable|string',

        // Tonalités
        'tonalites.travaillomane' => 'required|numeric',
        'tonalites.perseverant' => 'required|numeric',
        'tonalites.empathique' => 'required|numeric',
        'tonalites.reveur' => 'required|numeric',
        'tonalites.promoteur' => 'required|numeric',
        'tonalites.rebelle' => 'required|numeric',

        // Avatar
        'gender' => 'nullable|in:male,female,neutral',
        'body_type' => 'nullable|in:full_body,generic',
        'selected_types.*' => 'in:outfit,facemask,hair,glasses,top,facewear,hero_character',
        'avatar_name' => 'nullable|string|max:255',
        'avatar_domaine' => 'nullable|string|max:255',
        'avatar_prompt' => 'nullable|string',
        'avatar_glb_url' => 'nullable|string',
        'source_image' => 'nullable|string',

        // Voice
        'voice_id' => 'nullable|uuid',
        'voice_language' => 'nullable|string',
        'voice_settings' => 'nullable|array',
        'voice_settings.vitesse' => 'nullable|numeric',
        'voice_settings.intonation' => 'nullable|numeric',
        'voice_settings.volume' => 'nullable|numeric',
        'custom_voice_file' => 'nullable|string',

        // Fichier (upload unique)
        'file'       => 'nullable|file|mimes:pdf,doc,docx,txt|max:51200',
        'type_label' => 'nullable|string|max:255',

        // URL RAG
        'rag_url'        => 'nullable|url',
        'rag_url_depth'  => 'nullable|in:single,site,path,sitemap,levels-2,levels-3',
        'rag_type_label' => 'nullable|string|max:255',

        // Notes manuelles
        'note.title'   => 'nullable|string|max:255',
        'note.content' => 'nullable|string',
        'note.format'  => 'nullable|in:plain,markdown,html',

        // API externe
        'external_api.url'       => 'nullable|url',
        'external_api.api_key'   => 'nullable|string|max:1024',
        'external_api.structure' => 'nullable|string',

        // n8n (array d’outils)
        'n8n_tools'                            => 'nullable|array',
        'n8n_tools.*.title'                    => 'nullable|string|max:255',
        'n8n_tools.*.mission'                  => 'nullable|string',
        'n8n_tools.*.workflow_id'              => 'required_with:n8n_tools|string',
        'n8n_tools.*.webhook_method'           => 'nullable|string|max:10',
        'n8n_tools.*.webhook_url'              => 'nullable|url',
        'n8n_tools.*.webhook_test_url'         => 'nullable|url',
        'n8n_tools.*.contract'                 => 'nullable|array',
        'n8n_tools.*.project_id'               => 'nullable|string|max:255',
        'n8n_tools.*.project_name'             => 'nullable|string|max:255',
        'n8n_tools.*.editor_url'               => 'nullable|url',

        // (compat) n8n objet unique
        'n8n.workflow_id'      => 'nullable|string',
        'n8n.tool_title'       => 'nullable|string|max:255',
        'n8n.tool_mission'     => 'nullable|string',
        'n8n.webhook_method'   => 'nullable|string|max:10',
        'n8n.webhook_url'      => 'nullable|url',
        'n8n.webhook_test_url' => 'nullable|url',
        'n8n.contract'         => 'nullable|array',
        'n8n.project_id'       => 'nullable|string|max:255',
        'n8n.project_name'     => 'nullable|string|max:255',
        'n8n.editor_url'       => 'nullable|url',

        'pricing.std_price'   => 'nullable|numeric|min:0',
'pricing.avatar_price'=> 'nullable|numeric|min:0',
'pricing.voice_price' => 'nullable|numeric|min:0',
'pricing.apis_price'  => 'nullable|numeric|min:0',
'pricing.n8n_price'   => 'nullable|numeric|min:0',

    ]);

    // 1. Tonalité
    $tonalite = Tonalite::create($request->tonalites);

    // 2. Agent IA
    $agent = AgentIA::create([
        'nom'            => $request->nom,
        'category_id'    => $request->integer('category_id'),
        'subcategory_id' => $request->integer('subcategory_id'),
        'description'    => $request->description,
        'type'           => $request->type,
        'tags'           => $request->tags,
        'user_id'        => Auth::id(),
    ]);

    // 3. Sous-titres
    foreach ($request->sous_titres as $sousTitreData) {
        $sousTitre = $agent->sousTitres()->create(['titre' => $sousTitreData['titre']]);
        foreach ($sousTitreData['responsabilites'] as $responsabilite) {
            $sousTitre->responsabilites()->create(['responsabilite' => $responsabilite]);
        }
    }

    // 4. Personnalité
    $personnalite = $agent->personnalite()->create([
        'role' => $request->role,
        'mission' => $request->mission,
        'tonalite_id' => $tonalite->id,
        'style_reponse' => $request->style_reponse,
        'contraintes_specifiques' => $request->contraintes_specifiques,
    ]);
    $agent->loadMissing(['category:id,name', 'subcategory:id,name']);
    $catName = $agent->category?->name ?? 'Non spécifiée';
    $subName = $agent->subcategory?->name ?? null;
    $subLine = $subName ? "Sous-catégorie : {$subName}\n" : '';

    // 5. Prompt système
    $generatedPrompt = <<<EOT
Tu es {$agent->nom}, un expert {$personnalite->role} spécialisé dans le domaine « {$catName} ».
{$subLine} .
## Ton rôle
Tu aides les startups dans leur mission de {$personnalite->mission}.
## Tu as une personnalité
Tonalités PCM : Travaillomane: {$tonalite->travaillomane}%, Persévérant: {$tonalite->perseverant}%, Empathique: {$tonalite->empathique}%, Rêveur: {$tonalite->reveur}%, Promoteur: {$tonalite->promoteur}%, Rebelle: {$tonalite->rebelle}%.
## Style de réponse : {$personnalite->style_reponse}
## Contraintes : {$personnalite->contraintes_specifiques}
EOT;
    $personnalite->update(['prompt_systeme' => $generatedPrompt]);
try {
        Http::asForm()->post(env('FASTAPI_URL').'/agent/metadata', [
            'agent'       => $agent->id,
            'description' => $agent->description,
        ]);
    } catch (\Throwable $e) {
        Log::error("⚠️ FastAPI metadata error", ['err' => $e->getMessage()]);
    }
    // 6. GLB
    $glbPath = $request->avatar_glb_url ?? null;
    $glbBase64 = null;
    $userId = Auth::id();
    if ($glbPath && str_starts_with($glbPath, 'http')) {
        try {
            $glbContent = file_get_contents($glbPath);
            if ($glbContent) {
                $fileName = 'avatars/' . $userId . '_' . time() . '.glb';
                Storage::disk('public')->put($fileName, $glbContent);
                $glbPath = $fileName;
            }
        } catch (\Exception $e) {
            Log::error('Erreur traitement GLB : ' . $e->getMessage());
        }
    }

    // 7. Avatar
    $avatar = Avatar::create([
        'user_id' => $userId,
        'agent_i_a_id' => $agent->id,
        'name' => $request->avatar_name,
        'domain' => $request->avatar_domaine,
        'prompt' => $request->avatar_prompt,
        'gender' => $request->gender,
        'body_type' => $request->body_type,
        'outfit' => $request->outfit,
        'facemask' => $request->facemask,
        'hair' => $request->hair,
        'glasses' => $request->glasses,
        'top' => $request->top,
        'facewear' => $request->facewear,
        'hero_character' => $request->hero_character,
        'system_prompt' => $request->avatar_prompt,
        'preview_url' => null,
        'glb_url' => $glbPath,
        'types' => $request->selected_types,
        'source_image' => $request->source_image,
    ]);

    // 8. Voix
    if ($request->voice_id || $request->custom_voice_file) {
        $voiceType = $request->custom_voice_file ? 'human' : 'ia';
        $voiceName = $voiceType === 'ia' ? 'Voix IA sélectionnée' : 'Voix personnalisée';
        $filePath = null;

        if ($request->custom_voice_file) {
            $decoded = base64_decode(preg_replace('#^data:audio/\w+;base64,#i', '', $request->custom_voice_file));
            $filename = 'voices/' . Str::uuid() . '.mp3';
            Storage::disk('public')->put($filename, $decoded);
            $filePath = $filename;
        } else {
            $languageCode = $request->voice_language ?? 'fr';
            $sourcePath = public_path("audio/voix_test/{$languageCode}.mp3");
            if (file_exists($sourcePath)) {
                $uuid = Str::uuid();
                $relativePath = "voices/ia/{$languageCode}/{$uuid}.mp3";
                Storage::disk('public')->makeDirectory("voices/ia/{$languageCode}");
                Storage::disk('public')->put($relativePath, file_get_contents($sourcePath));
                $filePath = $relativePath;
            } else {
                Log::warning("⚠️ Fichier audio de test manquant pour la langue : {$languageCode}");
            }
        }

        $voice = Voice::where('id', $request->voice_id)
            ->where('user_id', $userId)
            ->first();

        if ($voice) {
            $voice->update([
                'agent_i_a_id' => $agent->id,
                'avatar_id'    => $avatar->id,
            ]);
        } else {
            Voice::create([
                'id'                 => $request->voice_id ?? Str::uuid(),
                'user_id'            => $userId,
                'agent_i_a_id'       => $agent->id,
                'avatar_id'          => $avatar->id,
                'voice_type'         => $voiceType,
                'voice_name'         => $voiceName,
                'voice_description'  => $voiceType === 'ia' ? 'Voix IA' : 'Fichier personnalisé',
                'language'           => $request->voice_language,
                'settings'           => $request->voice_settings ?? ['vitesse' => 1, 'intonation' => 1, 'volume' => 1],
                'file_path'          => $filePath,
            ]);
        }
    }

    // 9) RAG : PDF -> documents ; autres fichiers -> rag_sources
    if ($request->hasFile('file')) {
        $f   = $request->file('file');
        $ext = strtolower($f->getClientOriginalExtension());
        $bin = file_get_contents($f->getRealPath());
        if ($bin === false) {
            return response()->json(['message' => "Impossible de lire le fichier uploadé."], 422);
        }
        $hash      = hash('sha256', $bin);
        $cleanName = $cleanUploadedName($f);
        $title     = pathinfo($cleanName, PATHINFO_FILENAME);

        if ($ext === 'pdf') {
            try {
                $hex = bin2hex($bin);
                DB::insert(
                    "INSERT INTO documents (agent_i_a_id, title, file_hash, file_data, processed, created_at, updated_at)
                     VALUES (?, ?, ?, decode(?, 'hex'), ?, now(), now())
                     ON CONFLICT (file_hash) DO UPDATE
                       SET agent_i_a_id = EXCLUDED.agent_i_a_id,
                           title        = EXCLUDED.title,
                           file_data    = EXCLUDED.file_data,
                           processed    = EXCLUDED.processed,
                           updated_at   = now()",
                    [$agent->id, $title, $hash, $hex, false]
                );
                $response = Http::asMultipart()
            ->attach(
                'files',                                // clé attendue par FastAPI
                file_get_contents($f->getRealPath()),   // contenu binaire
                $f->getClientOriginalName()             // nom du fichier
            )
            ->post(env('FASTAPI_URL').'/ingest/pdf', [
                'agent' => $agent->id,                  // champ form-data simple
            ]);

        if ($response->failed()) {
            Log::error("⚠️ FastAPI ingest/pdf failed", [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);
        }
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error('Insert/Upsert PDF (BYTEA) failed', [
                    'sqlstate' => $e->errorInfo[0] ?? null,
                    'message'  => $e->errorInfo[2] ?? $e->getMessage(),
                ]);
                return response()->json([
                    'code'    => 'PDF_DB_WRITE_ERROR',
                    'message' => "Erreur BD lors de l'enregistrement du PDF.",
                ], 422, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
            }
        } else {
            RagSource::create([
                'type'         => 'file',
                'type_label'   => $request->type_label ?? 'Fichier',
                'agent_i_a_id' => $agent->id,
                'user_id'      => $userId,
                'name'         => $cleanName,
                'url'          => null,
                'statut'       => false,
            ]);
        }
    }

    // 9.b) URL → rag_sources
    if ($request->filled('rag_url')) {
        $target = $request->rag_url;
        $parsed = parse_url($target);
        $name   = $target;
        if (!empty($parsed['host'])) {
            $name = $parsed['host'] . (!empty($parsed['path']) ? $parsed['path'] : '');
        }
        $name = $sanitizeUtf8($name);

        RagSource::create([
            'type'         => 'url',
            'type_label'   => $request->input('rag_type_label', 'URL'),
            'agent_i_a_id' => $agent->id,
            'user_id'      => $userId,
            'name'         => $name,
            'url'          => $target,
            'config'       => [
                'depth' => $request->input('rag_url_depth', 'single'),
            ],
            'statut'       => false,
        ]);
          Http::post(env('FASTAPI_URL').'/ingest/url', [
            'agent'   => $agent->id,
            'user_id' => $userId,
            'urls'    => [$request->rag_url],
        ]);
    }

    // 9.c) DONNÉES INTERNES (Sheets / SQL / CRM) → rag_sources
    $internalType = $request->input('internal.type'); // 'sheets' | 'sql' | 'crm' (optionnel)
    if ($internalType) {
        $internalType = strtolower($internalType);
        $label  = $request->input('rag_type_label', 'Données internes');
        $name   = null;
        $url    = null;

        $config = ['source' => $internalType];

        if ($internalType === 'sheets') {
            $url = $request->input('internal.url');
            $name = $url ? ('Sheet: ' . $url) : 'Google Sheets';
            $config['url']     = $url;
            $config['public']  = true;
        } elseif ($internalType === 'crm') {
            $url = $request->input('internal.url');
            $name = $url ? ('CRM: ' . $url) : 'CRM';
            $config['url'] = $url;
        } elseif ($internalType === 'sql') {
            $sql = [
                'host' => $request->input('internal.sql.host'),
                'port' => (int) $request->input('internal.sql.port', 3306),
                'db'   => $request->input('internal.sql.db'),
                'user' => $request->input('internal.sql.user'),
                'pass' => $request->input('internal.sql.pass'),
            ];
            $config['sql'] = $sql;
            $name = sprintf('SQL %s:%s/%s', $sql['host'] ?? 'host', $sql['port'] ?? 'port', $sql['db'] ?? 'db');
            $url = null;
        } else {
            $internalType = null;
        }

        if ($internalType) {
            RagSource::create([
                'type'         => 'internal',
                'type_label'   => $label,
                'agent_i_a_id' => $agent->id,
                'user_id'      => $userId,
                'name'         => $sanitizeUtf8($name ?? 'Données internes'),
                'url'          => $url,
                'config'       => $config,
                'statut'       => false,
            ]);
        }
    }

    // 9.d) Notes manuelles → rag_sources
    if ($request->filled('note.title') && $request->filled('note.content')) {
        $noteTitle   = trim($request->input('note.title'));
        $noteContent = $request->input('note.content');
        $noteFormat  = $request->input('note.format', 'markdown');

        RagSource::create([
            'type'         => 'note',
            'type_label'   => 'Notes manuelles',
            'agent_i_a_id' => $agent->id,
            'user_id'      => $userId,
            'name'         => $noteTitle,
            'url'          => null,
            'config'       => [
                'content' => $noteContent,
                'format'  => $noteFormat,
            ],
            'statut'       => false,
        ]);
          Http::post(env('FASTAPI_URL').'/ingest/notes', [
            'agent'   => $agent->id,
            'user_id' => $userId,
            'notes'   => [[
                'content' => $request->input('note.content'),
                'format'  => $request->input('note.format', 'markdown'),
            ]],
        ]);
    }

    // 9.e) API EXTERNE → rag_sources(type = 'external_api')
    $apiUrl  = $request->input('external_api.url');
    $apiKey  = $request->input('external_api.api_key');
    $struct  = $request->input('external_api.structure');
    if ($apiUrl && $struct) {
        $structure = [];
        try {
            $decoded = json_decode($struct, true, flags: JSON_THROW_ON_ERROR);
            if (is_array($decoded)) $structure = $decoded;
        } catch (\Throwable $e) {
            $structure = [];
        }

        RagSource::create([
            'type'         => 'external_api',
            'type_label'   => 'API Externe',
            'agent_i_a_id' => $agent->id,
            'user_id'      => $userId,
            'name'         => $apiUrl,
            'url'          => $apiUrl,
            'config'       => [
                'url'       => $apiUrl,
                'api_key'   => $apiKey,
                'structure' => $structure,
            ],
            'statut'       => false,
        ]);
    }

    // 9.f) COLLAB (Notion)
    $collab = $request->input('collab');
    if (is_array($collab) && ($collab['platform'] ?? null) === 'notion' && !empty($collab['id'])) {
        $notionId = trim($collab['id']);
        $tok      = $collab['token'] ?? null;

        $name = 'Notion: ' . $notionId;

        RagSource::create([
            'type'         => 'notion',
            'type_label'   => 'Notion',
            'agent_i_a_id' => $agent->id,
            'user_id'      => $userId,
            'name'         => $name,
            'url'          => $notionId,
            'config'       => [
                'platform' => 'notion',
                'id'       => $notionId,
                'token'    => $tok,
            ],
            'statut'       => false,
        ]);
    }

    // 9.g) >>>>>>>>>>>>>> ENREGISTREMENT N8N DANS LA BDD <<<<<<<<<<<<<<
    $savedN8n = [];

    // (1) Array n8n_tools[]
    $tools = $request->input('n8n_tools', []);
    if (is_array($tools) && count($tools)) {
        foreach ($tools as $tool) {
            $wfId = (string)($tool['workflow_id'] ?? '');
            if ($wfId === '') continue;

            /** @var \App\Models\N8nWorkflowTemplate $tpl */
            $tpl = \App\Models\N8nWorkflowTemplate::firstOrNew([
                'user_id'     => $userId,
                'agent_i_a_id'    => $agent->id,
                'workflow_id' => $wfId,
            ]);

            $tpl->fill([
                'name'             => $sanitizeUtf8($tool['title']   ?? ''),
                'description'      => $sanitizeUtf8($tool['mission'] ?? ''),
                'webhook_method'   => isset($tool['webhook_method']) ? strtoupper($tool['webhook_method']) : null,
                'webhook_url'      => $tool['webhook_url']      ?? null,
                'webhook_test_url' => $tool['webhook_test_url'] ?? null,
                'contract'         => $tool['contract']         ?? [],
                // on ignore params_nodes ici volontairement
                'project_key'      => $tool['project_id']       ?? null,
                'project_name'     => $tool['project_name']     ?? null,
                'editor_url'       => $tool['editor_url']       ?? null,
                'tool_title'       => $sanitizeUtf8($tool['title']   ?? ''),
                'tool_mission'     => $sanitizeUtf8($tool['mission'] ?? ''),
            ]);

            $tpl->save();
            $savedN8n[] = $tpl->withoutRelations()->toArray();
        }
    }

    // (2) Compat: objet unique n8n.*
    if ($request->filled('n8n.workflow_id')) {
        $wfId = (string)$request->input('n8n.workflow_id');

        $tpl = \App\Models\N8nWorkflowTemplate::firstOrNew([
            'user_id'     => $userId,
            'agent_id'    => $agent->id,
            'workflow_id' => $wfId,
        ]);

        $tpl->fill([
            'name'             => $sanitizeUtf8($request->input('n8n.tool_title', '')),
            'description'      => $sanitizeUtf8($request->input('n8n.tool_mission', '')),
            'webhook_method'   => ($m = $request->input('n8n.webhook_method')) ? strtoupper($m) : null,
            'webhook_url'      => $request->input('n8n.webhook_url'),
            'webhook_test_url' => $request->input('n8n.webhook_test_url'),
            'contract'         => $request->input('n8n.contract', []),
            'project_key'      => $request->input('n8n.project_id'),
            'project_name'     => $request->input('n8n.project_name'),
            'editor_url'       => $request->input('n8n.editor_url'),
            'tool_title'       => $sanitizeUtf8($request->input('n8n.tool_title', '')),
            'tool_mission'     => $sanitizeUtf8($request->input('n8n.tool_mission', '')),
        ]);

        $tpl->save();
        $savedN8n[] = $tpl->withoutRelations()->toArray();
    }
$pricingData = $request->input('agent_pricing', []);
$pricing = \App\Models\AgentPricing::create([
                   'agent_i_a_id'       => $agent->id,
    'std_price'     => $pricingData['std_price']    ?? 0,
    'avatar_price'  => $pricingData['avatar_price'] ?? 0,
    'voice_price'   => $pricingData['voice_price']  ?? 0,
    'apis_price'    => $pricingData['apis_price']   ?? 0,
    'n8n_price'     => $pricingData['n8n_price']    ?? 0,
    'price_startup' => $pricingData['price_startup']?? 0,
    'total_price'   => $pricingData['total_price']  ?? 0,
    'creator_share' => $pricingData['creator_share']?? 0,
    'platform_share'=> $pricingData['platform_share']?? 0,
]);

$pricingPayload = $pricing->withoutRelations()->toArray();
    // 10) Réponse
    $agentPayload  = $agent->withoutRelations()->toArray();
    $avatarPayload = $avatar->withoutRelations()->toArray();

    $payload = $sanitizeUtf8([
        'message'        => '✅ Agent IA, avatar et ressources enregistrés.',
        'agent'          => $agentPayload,
            'pricing'        => $pricingPayload,

        'avatar'         => $avatarPayload,
        'glb_url'        => $glbPath,
        'n8n_templates'  => $savedN8n, // ← ce qui a été enregistré pour n8n
    ]);

    return response()->json(
        $payload,
        200,
        ['Content-Type' => 'application/json; charset=utf-8'],
        JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
    );
}





public function processGlbUrl(Request $request)
{
    $request->validate([
        'glb_url' => 'required|string'
    ]);
    
    $glbUrl = $request->glb_url;
    $userId = Auth::id();
    
    // Si c'est déjà un chemin local, ne rien faire
    if (str_starts_with($glbUrl, 'avatars/')) {
        return response()->json([
            'success' => true,
            'message' => 'Fichier déjà sauvegardé localement',
            'local_path' => $glbUrl,
            'file_name' => basename($glbUrl),
            'already_local' => true
        ]);
    }
    
    try {
        // Télécharger le fichier GLB
        $context = stream_context_create([
            'http' => [
                'timeout' => 30,
                'user_agent' => 'Mozilla/5.0 (compatible; Laravel GLB Downloader)'
            ]
        ]);
        
        $glbContent = file_get_contents($glbUrl, false, $context);
        
        if (!$glbContent) {
            return response()->json([
                'success' => false,
                'message' => 'Impossible de télécharger le fichier depuis l\'URL'
            ], 400);
        }
        
        // Vérification basique du format GLB
        if (strlen($glbContent) < 20) {
            return response()->json([
                'success' => false,
                'message' => 'Le fichier téléchargé semble invalide (trop petit)'
            ], 400);
        }
        
        // Générer un nom unique pour le fichier
        $timestamp = now()->format('Y-m-d_H-i-s');
        $uniqueId = substr(md5($glbUrl . $userId . $timestamp), 0, 8);
        $fileName = "avatar_{$userId}_{$uniqueId}.glb";
        $filePath = "avatars/{$fileName}";
        
        // Créer le dossier avatars s'il n'existe pas
        if (!Storage::disk('public')->exists('avatars')) {
            Storage::disk('public')->makeDirectory('avatars');
        }
        
        // Sauvegarder le fichier
        Storage::disk('public')->put($filePath, $glbContent);
        
        // Vérifier la sauvegarde
        if (!Storage::disk('public')->exists($filePath)) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la sauvegarde du fichier'
            ], 500);
        }
        
        $fileSize = Storage::disk('public')->size($filePath);
        
        Log::info("✅ GLB téléchargé et sauvegardé", [
            'original_url' => $glbUrl,
            'local_path' => $filePath,
            'file_size' => $fileSize,
            'user_id' => $userId
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Fichier GLB téléchargé et sauvegardé avec succès',
            'local_path' => $filePath,
            'file_name' => $fileName,
            'file_size' => round($fileSize / 1024, 2) . ' KB',
            'storage_url' => asset('storage/' . $filePath),
            'original_url' => $glbUrl
        ]);
        
    } catch (\Exception $e) {
        Log::error('❌ Erreur téléchargement GLB', [
            'url' => $glbUrl,
            'error' => $e->getMessage(),
            'user_id' => $userId
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Erreur technique : ' . $e->getMessage()
        ], 500);
    }
}


    public function generateAvatarPrompt(Request $request)
{
    // --- A) Pas de limite d'exécution PHP pour cette action ---
    @set_time_limit(0);
    ini_set('max_execution_time', '0');

    $request->validate([
        'avatar_name'     => 'required|string',
        'avatar_prompt'   => 'required|string',
        'gender'          => 'required|in:male,female,neutral',
        'body_type'       => 'required|in:full_body,generic',
        'outfit'          => 'nullable|string',
        'facemask'        => 'nullable|string',
        'hair'            => 'nullable|string',
        'glasses'         => 'nullable|string',
        'top'             => 'nullable|string',
        'facewear'        => 'nullable|string',
        'hero_character'  => 'nullable|string',
        'selected_types'  => 'required|array',
        'selected_types.*'=> 'in:outfit,facemask,hair,glasses,top,facewear,hero_character',
    ]);

    $baseUrl = rtrim(env('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'), '/');
    $model   = env('OLLAMA_MODEL', 'llama3:latest');
    $apiKey  = env('OLLAMA_API_KEY');

    $typesFormates = implode(', ', $request->selected_types ?? []);

    $userPrompt = <<<EOT
Tu es un générateur d'avatar 3D Ready Player Me.

Voici les préférences :
- Nom : {$request->avatar_name}
- Description utilisateur : {$request->avatar_prompt}
- Genre : {$request->gender}
- Morphologie : {$request->body_type}
- Outfit : {$request->outfit}
- Hair : {$request->hair}
- Glasses : {$request->glasses}
- Top : {$request->top}
- Facemask : {$request->facemask}
- Facewear : {$request->facewear}
- Héros : {$request->hero_character}
- Types sélectionnés : [{$typesFormates}]

Objectif :
Génère une courte description professionnelle (1 phrase), optimisée pour l’URL Ready Player Me,
ton neutre, descriptif, sans répétitions.
EOT;

    $headers = ['Content-Type' => 'application/json'];
    if (!empty($apiKey)) $headers['Authorization'] = 'Bearer '.$apiKey;

    // --- B) Ping santé Ollama (statut & modèles) pour diagnostiquer les 404/KO ---
    try {
        $health = \Illuminate\Support\Facades\Http::withHeaders($headers)
            ->timeout(5) // ping très court
            ->connectTimeout(2)
            ->get($baseUrl . '/api/tags');

        if (!$health->successful()) {
            return response()->json([
                'prompt' => 'Ollama ne répond pas correctement (/api/tags).',
                'details' => $health->json(),
                'preview_url' => null,
            ], 502);
        }
    } catch (\Throwable $e) {
        return response()->json([
            'prompt' => 'Impossible de joindre Ollama (/api/tags).',
            'error' => $e->getMessage(),
            'preview_url' => null,
        ], 502);
    }

    // --- C) Appel OpenAI-compatible sans AUCUN timeout côté Guzzle ---
    $endpoint = $baseUrl . '/v1/chat/completions';

    $payload = [
        'model' => $model,
        'messages' => [
            ['role' => 'system', 'content' => 'Tu es un expert en création d’avatars 3D avec Ready Player Me.'],
            ['role' => 'user',   'content' => $userPrompt],
        ],
        'temperature' => 0.6,
        'stream' => false,
        'options' => [
            // Contraindre l’empreinte pour accélérer la première réponse
            'num_ctx'     => 512,
            'num_keep'    => 8,
            'num_predict' => 60,
            'num_batch'   => 16,
            'num_thread'  => 4,
        ],
    ];

    try {
        $response = \Illuminate\Support\Facades\Http::withHeaders($headers)
            // 0 = infini (Guzzle)
            ->timeout(0)
            ->connectTimeout(0)
            ->withOptions([
                'read_timeout' => 0,   // cURL
                'timeout'       => 0,  // redondant mais explicite
                'connect_timeout'=> 0,
            ])
            // petit retry défensif en cas de micro coupure locale
            ->retry(2, 1000, throw: false)
            ->post($endpoint, $payload);

        if ($response->successful()) {
            $json = $response->json();
            $generated = $json['choices'][0]['message']['content'] ?? null;

            if (!$generated) {
                return response()->json([
                    'prompt' => 'Réponse Ollama invalide (contenu vide).',
                    'preview_url' => null,
                ], 502);
            }

            $domain = preg_replace('#^https?://#', '', (string) env('RPM_DOMAIN', 'example.com'));
            $url = "https://{$domain}/avatar?frameApi&description=" . urlencode(trim($generated));

            return response()->json([
                'prompt' => trim($generated),
                'preview_url' => $url,
            ]);
        }

        return response()->json([
            'prompt'   => 'Erreur Ollama: ' . $response->status(),
            'details'  => $response->json(),
            'preview_url' => null,
        ], 502);

    } catch (\Throwable $e) {
        return response()->json([
            'prompt' => 'Exception lors de l’appel à Ollama',
            'error'  => $e->getMessage(),
            'preview_url' => null,
        ], 500);
    }
}

  public function generatePromptWithAI(Request $request)
{
    @set_time_limit(0);
    ini_set('max_execution_time', '0');

    $request->validate([
        'prompt' => 'required|string',
    ]);

    $baseUrl = rtrim(env('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'), '/');
    $model   = env('OLLAMA_MODEL', 'llama3:latest');
    $apiKey  = env('OLLAMA_API_KEY');

    $headers = ['Content-Type' => 'application/json'];
    if (!empty($apiKey)) $headers['Authorization'] = 'Bearer '.$apiKey;

    $userPrompt = $request->prompt;

    $rewriteInstruction = <<<SYS
Tu es un expert en amélioration de prompts système pour agents IA.  
⚠️ Règles impératives :
- Tu dois répondre UNIQUEMENT en FRANÇAIS.  
- Tu ne dois PAS inventer de nouveaux personnages, noms, chiffres ou contraintes.  
- Tu dois simplement améliorer la clarté, la concision et la structure du prompt fourni.  
- Utilise un ton normatif (instructions), structuré avec titres et listes si nécessaire.  
- Ne sors que le prompt final, sans explications supplémentaires.  
- Encadre le résultat entre les balises <SYSTEM_PROMPT> et </SYSTEM_PROMPT>.  
SYS;

    $contentForModel = <<<USR
$rewriteInstruction

<INPUT_PROMPT>
$userPrompt
</INPUT_PROMPT>

Réécris le prompt système en français et renvoie uniquement :
<SYSTEM_PROMPT>
...ton prompt réécrit ici...
</SYSTEM_PROMPT>
USR;

    $payload = [
        'model' => $model,
        'messages' => [
            ['role' => 'system', 'content' => "Tu produis des prompts système impeccables et en français uniquement."],
            ['role' => 'user',   'content' => $contentForModel],
        ],
        'temperature' => 0.2,
        'stream' => false,
        'options' => [
            'num_ctx'     => 512,
            'num_keep'    => 16,
            'num_predict' => 220,
        ],
    ];

    try {
        $resp = \Illuminate\Support\Facades\Http::withHeaders($headers)
            ->timeout(0)->connectTimeout(0)
            ->withOptions(['read_timeout' => 0])
            ->post($baseUrl . '/v1/chat/completions', $payload);

        if (!$resp->successful()) {
            return response()->json([
                'error'   => 'Erreur Ollama: '.$resp->status(),
                'details' => $resp->json(),
            ], 502);
        }

        $json = $resp->json();
        $raw  = $json['choices'][0]['message']['content'] ?? '';

        $improved = '';
        if (preg_match('#<SYSTEM_PROMPT>\s*(.*?)\s*</SYSTEM_PROMPT>#is', $raw, $m)) {
            $improved = trim($m[1]);
        } else {
            $improved = trim($raw);
        }

        if ($improved === '') $improved = trim($userPrompt);

        return response()->json([
            'improvedPrompt' => $improved,
        ]);

    } catch (\Throwable $e) {
        return response()->json([
            'error'   => 'Exception lors de l’appel à Ollama',
            'details' => $e->getMessage(),
        ], 500);
    }
}



    public function generateAvatarFromImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        // 1. Upload de l’image
        $image = $request->file('image');
        $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('avatars', $filename, 'public');
        $imageUrl = asset('storage/' . $path);

        // 2. Prompt IA automatique basé uniquement sur l'image
        $apiKey = env('OPENAI_API_KEY');

        $promptIA = <<<EOT
        Tu es un générateur de descriptions pour avatars 3D. Un utilisateur a uploadé une photo ici : {$imageUrl}

        À partir de cette photo, imagine un avatar 3D professionnel, avec un style vestimentaire et des caractéristiques marquantes (lunettes, coupe de cheveux, ambiance, etc.).

        Ta réponse doit être une description très courte, stylée, et adaptée à une URL pour Ready Player Me.
        EOT;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'Tu es un assistant expert en avatars 3D.'],
                ['role' => 'user', 'content' => $promptIA],
            ],
            'temperature' => 0.7,
        ]);

        if (!$response->successful() || !isset($response['choices'][0]['message']['content'])) {
            return response()->json(['error' => 'Erreur IA GPT'], 500);
        }

        $description = trim($response['choices'][0]['message']['content']);

        // 3. Générer l’URL Ready Player Me
        $rpmDomain = env('RPM_DOMAIN'); // ex : braindcode-startup-studio.readyplayer.me
        $appId = env('RPM_APP_ID');     // depuis ton studio RPM

        $rpmUrl = "https://{$rpmDomain}/avatar?appId={$appId}&frameApi&photoUpload&description=" . urlencode($description);

        return response()->json([
            'message' => '✅ Image analysée, URL personnalisée générée.',
            'source_image' => $imageUrl,
            'description' => $description,
            'rpm_url' => $rpmUrl,
        ]);
    }

    public function getResembleVoices()
    {
        try {
            $apiKey = env('RESEMBLE_API_KEY');

            if (!$apiKey) {
                Log::warning('Clé API Resemble.ai manquante');
                return $this->getFallbackVoices();
            }

            $response = Http::timeout(15)->withHeaders([
                'Authorization' => 'Token ' . $apiKey,
            ])->get('https://app.resemble.ai/api/v2/voices', [
                'page' => 1,
                'page_size' => 10  // Limiter à 10 pour des raisons de performance
            ]);

            if ($response->successful()) {
                $data = $response->json();

                // Vérifier les deux structures possibles (items ou voices selon la documentation)
                $voicesArray = isset($data['items']) ? $data['items'] : (isset($data['voices']) ? $data['voices'] : []);

                if (is_array($voicesArray) && !empty($voicesArray)) {
                    // Formater les voix pour le frontend
                    $voices = collect($voicesArray)
                        ->map(function ($voice) {
                            // Déterminer le genre si non spécifié
                            $gender = $voice['gender'] ?? 'neutral';
                            $name = $voice['name'] ?? '';

                            if (!$gender || $gender === 'neutral') {
                                // Essayer de déterminer le genre par le nom
                                $lowerName = strtolower($name);
                                if (str_contains($lowerName, 'female') || str_contains($lowerName, 'woman')) {
                                    $gender = 'female';
                                } elseif (str_contains($lowerName, 'male') || str_contains($lowerName, 'man')) {
                                    $gender = 'male';
                                }
                            }

                            return [
                                'id' => $voice['uuid'],
                                'name' => $name,
                                'gender' => $gender,
                                'description' => $voice['description'] ??
                                    ($gender === 'female' ? 'Voix naturelle, chaleureuse' : 'Ton dynamique, inspirant'),
                                'language' => $voice['default_language'] ?? 'fr',
                                'is_public' => $voice['is_public'] ?? true,
                                'is_cloned' => $voice['is_clone'] ?? false
                            ];
                        })
                        // Filtrer les voix publiques si nécessaire
                        ->filter(function ($voice) {
                            return $voice['is_public'];
                        })
                        ->take(4)  // Prendre les 3 premières voix
                        ->values()
                        ->toArray();

                    if (!empty($voices)) {
                        Log::info('Voix Resemble récupérées avec succès: ' . count($voices));
                        return response()->json($voices);
                    }
                }

                Log::warning('Aucune voix trouvée ou format incorrect dans la réponse Resemble');
            } else {
                Log::warning('Erreur API Resemble: ' . $response->status() . ' - ' . $response->body());
            }

            // Si on arrive ici, c'est qu'on n'a pas pu récupérer de voix


        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des voix Resemble.ai: ' . $e->getMessage());
        }
    }

    private function getFallbackVoices()
    {
        // Voix par défaut en cas d'erreur
        return response()->json([
            [
                'id' => 'clara',
                'name' => 'Clara (F)',
                'gender' => 'female',
                'description' => 'Voix naturelle, chaleureuse',
                'language' => 'fr',
                'is_default' => true
            ],
            [
                'id' => 'mike',
                'name' => 'Mike (M)',
                'gender' => 'male',
                'description' => 'Ton dynamique, inspirant',
                'language' => 'fr',
                'is_default' => true
            ],
            [
                'id' => 'robot',
                'name' => 'RobotVoice',
                'gender' => 'neutral',
                'description' => 'Robotique, uniforme',
                'language' => 'fr',
                'is_default' => true
            ]
        ]);
    }

        public function generateVoiceSample(Request $request)
    {
        $validated = $request->validate([
            'voice_id' => 'required|string',
            'text' => 'required|string|max:500',
            'language' => 'required|string|in:fr,en,es,de,it',
            'settings' => 'nullable|array',
            'settings.speed' => 'nullable|numeric|between:0.5,2.0',
            'settings.pitch' => 'nullable|numeric|between:0.5,2.0',
            'settings.volume' => 'nullable|numeric|between:0.1,1.0'
        ]);

        try {
            $apiKey = env('RESEMBLE_API_KEY');
            $projectUuid = env('RESEMBLE_PROJECT_UUID'); // ✅ NOUVEAU: Variable d'environnement

            if (!$apiKey) {
                throw new \Exception('Clé API Resemble.ai manquante');
            }

            if (!$projectUuid) {
                throw new \Exception('Project UUID Resemble.ai manquant');
            }

            // Voix par défaut statiques
            if (in_array($validated['voice_id'], ['clara', 'mike', 'robot', 'alex'])) {
                return response()->json([
                    'audio_url' => '/audio/samples/' . $validated['voice_id'] . '.mp3',
                    'success' => true
                ]);
            }

            $settings = $validated['settings'] ?? [];

            // ✅ Structure selon la documentation officielle
            $payload = [
                'voice_uuid' => $validated['voice_id'],
                'body' => $validated['text'],
                'title' => 'Sample_' . time(),
                'is_archived' => false
            ];

            // Paramètres optionnels (seulement si différents de la valeur par défaut)
            if (isset($settings['speed']) && $settings['speed'] != 1.0) {
                $payload['speed'] = $settings['speed'];
            }
            if (isset($settings['pitch']) && $settings['pitch'] != 1.0) {
                $payload['pitch'] = $settings['pitch'];
            }
            if (isset($settings['volume']) && $settings['volume'] != 1.0) {
                $payload['volume'] = $settings['volume'];
            }

            Log::info('🎵 Création clip Resemble', [
                'project_uuid' => $projectUuid,
                'voice_id' => $validated['voice_id'],
                'payload' => $payload
            ]);

            // ✅ ENDPOINT CORRECT avec project_uuid
            $url = "https://app.resemble.ai/api/v2/projects/{$projectUuid}/clips";

            $response = Http::timeout(60)->withHeaders([
                'Authorization' => 'Token ' . $apiKey,
                'Content-Type' => 'application/json'
            ])->post($url, $payload);

            if (!$response->successful()) {
                Log::error('❌ Erreur API Resemble', [
                    'url' => $url,
                    'status' => $response->status(),
                    'response' => $response->body(),
                    'payload' => $payload
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Erreur API Resemble: ' . $response->status(),
                    'debug' => [
                        'url' => $url,
                        'status' => $response->status(),
                        'response' => $response->body()
                    ]
                ], 500);
            }

            $data = $response->json();
            Log::info('✅ Clip créé', $data);

            // Selon la documentation, la réponse contient success: true et item
            if (isset($data['success']) && $data['success'] === true && isset($data['item'])) {
                $clip = $data['item'];

                // Si le clip a une URL audio directement disponible
                if (isset($clip['audio_src']) && !empty($clip['audio_src'])) {
                    return response()->json([
                        'audio_url' => $clip['audio_src'],
                        'success' => true,
                        'clip_uuid' => $clip['uuid'] ?? null
                    ]);
                }

                // Si le clip est en cours de traitement, retourner l'UUID pour polling
                return response()->json([
                    'success' => false,
                    'message' => 'Clip créé mais en cours de traitement',
                    'clip_uuid' => $clip['uuid'] ?? null,
                    'status' => 'processing',
                    'requires_polling' => true
                ], 202);
            }

            return response()->json([
                'success' => false,
                'message' => 'Réponse inattendue de l\'API',
                'debug' => $data
            ], 500);
        } catch (\Exception $e) {
            Log::error('❌ Exception génération sample: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }
    /**
     * Vérifie le statut d'un clip et retourne l'URL audio quand prêt
     */
    public function getClipStatus(Request $request)
    {
        $validated = $request->validate([
            'clip_uuid' => 'required|string'
        ]);

        try {
            $apiKey = env('RESEMBLE_API_KEY');
            $projectUuid = env('RESEMBLE_PROJECT_UUID');

            if (!$apiKey || !$projectUuid) {
                throw new \Exception('Configuration API manquante');
            }

            $clipUuid = $validated['clip_uuid'];
            $url = "https://app.resemble.ai/api/v2/projects/{$projectUuid}/clips/{$clipUuid}";

            $response = Http::timeout(30)->withHeaders([
                'Authorization' => 'Token ' . $apiKey
            ])->get($url);

            if (!$response->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur récupération clip: ' . $response->status()
                ], $response->status());
            }

            $data = $response->json();

            if (isset($data['success']) && $data['success'] && isset($data['item'])) {
                $clip = $data['item'];

                if (isset($clip['audio_src']) && !empty($clip['audio_src'])) {
                    return response()->json([
                        'success' => true,
                        'audio_url' => $clip['audio_src'],
                        'status' => 'ready'
                    ]);
                } else {
                    return response()->json([
                        'success' => false,
                        'status' => 'processing',
                        'message' => 'Clip en cours de traitement'
                    ], 202);
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Clip non trouvé'
            ], 404);
        } catch (\Exception $e) {
            Log::error('❌ Erreur statut clip: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }
    /**
 * Affichage HTML corrigé des projets avec pagination
 */
public function showProjectsHTML()
{
    $apiKey = env('RESEMBLE_API_KEY');
    
    if (!$apiKey) {
        return '<h1>❌ RESEMBLE_API_KEY manquante dans .env</h1>';
    }
    
    try {
        // ✅ CORRECTION: Ajouter les paramètres de pagination
        $response = Http::withHeaders([
            'Authorization' => 'Token ' . $apiKey,
            'Content-Type' => 'application/json'
        ])->get('https://app.resemble.ai/api/v2/projects', [
            'page' => 1,        // ✅ Page commence à 1
            'page_size' => 50   // ✅ Nombre d'éléments par page
        ]);
        
        if (!$response->successful()) {
            $errorBody = $response->body();
            $statusCode = $response->status();
            
            return "<h1>❌ Erreur API: {$statusCode}</h1>
                    <h3>Détails de l'erreur:</h3>
                    <pre>{$errorBody}</pre>
                    <h3>Headers de la requête:</h3>
                    <pre>Authorization: Token " . substr($apiKey, 0, 10) . "...
Content-Type: application/json</pre>
                    <h3>URL appelée:</h3>
                    <pre>https://app.resemble.ai/api/v2/projects?page=1&page_size=50</pre>";
        }
        
        $data = $response->json();
        
        $html = '<h1>🏗️ Vos Projets Resemble.ai</h1>';
        $html .= '<p><strong>Statut API:</strong> ✅ Succès (Code: ' . $response->status() . ')</p>';
        $html .= '<style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa; }
            .project { border: 2px solid #007cba; margin: 20px 0; padding: 15px; border-radius: 8px; background: white; }
            .uuid { background: #f0f0f0; padding: 10px; font-family: monospace; font-weight: bold; color: #d63384; margin: 10px 0; border-radius: 4px; }
            .name { color: #0d6efd; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
            .recommended { background: #d4edda; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #28a745; }
            .copy-btn { background: #007cba; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer; margin-left: 10px; }
        </style>';
        
        // Afficher les métadonnées de la réponse
        if (isset($data['total_count'])) {
            $html .= '<p><strong>Total projets:</strong> ' . $data['total_count'] . '</p>';
        }
        if (isset($data['page'])) {
            $html .= '<p><strong>Page actuelle:</strong> ' . $data['page'] . '</p>';
        }
        
        if (isset($data['items']) && is_array($data['items']) && count($data['items']) > 0) {
            $html .= '<h2>📋 Liste des projets (' . count($data['items']) . ' trouvés):</h2>';
            
            foreach ($data['items'] as $index => $project) {
                $name = $project['name'] ?? 'Sans nom';
                $uuid = $project['uuid'] ?? 'UUID manquant';
                $description = $project['description'] ?? 'Aucune description';
                $archived = ($project['is_archived'] ?? false) ? '📦 Oui' : '✅ Non';
                $createdAt = $project['created_at'] ?? 'Date inconnue';
                
                $html .= '<div class="project">';
                $html .= '<div class="name">📁 ' . htmlspecialchars($name) . '</div>';
                $html .= '<div class="uuid">UUID: ' . htmlspecialchars($uuid) . '</div>';
                $html .= '<p><strong>📝 Description:</strong> ' . htmlspecialchars($description) . '</p>';
                $html .= '<p><strong>📦 Archivé:</strong> ' . $archived . '</p>';
                $html .= '<p><strong>📅 Créé le:</strong> ' . htmlspecialchars($createdAt) . '</p>';
                
                // Vérifier si c'est le projet BRAINDCODE
                if (stripos($name, 'braindcode') !== false || 
                    stripos($name, 'startup') !== false || 
                    stripos($name, 'studio') !== false) {
                    
                    $html .= '<div class="recommended">';
                    $html .= '<strong>🎯 PROJET RECOMMANDÉ TROUVÉ!</strong><br><br>';
                    $html .= '<strong>📋 Ajoutez cette ligne dans votre fichier .env:</strong><br>';
                    $html .= '<code style="background: white; padding: 10px; display: block; margin: 10px 0; border-radius: 4px; font-size: 14px;">';
                    $html .= 'RESEMBLE_PROJECT_UUID=' . htmlspecialchars($uuid);
                    $html .= '</code>';
                    $html .= '<button class="copy-btn" onclick="copyToClipboard(\'' . htmlspecialchars($uuid) . '\')">📋 Copier UUID</button>';
                    $html .= '</div>';
                }
                
                $html .= '</div>';
            }
            
            // Script JavaScript pour copier dans le presse-papiers
            $html .= '<script>
                function copyToClipboard(text) {
                    navigator.clipboard.writeText(text).then(function() {
                        alert("UUID copié dans le presse-papiers: " + text);
                    });
                }
            </script>';
            
        } else {
            $html .= '<div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107;">';
            $html .= '<h3>⚠️ Aucun projet trouvé</h3>';
            $html .= '<p>Votre compte Resemble.ai ne contient aucun projet, ou ils ne sont pas accessibles avec cette clé API.</p>';
            $html .= '<p><strong>Suggestions:</strong></p>';
            $html .= '<ul>';
            $html .= '<li>Vérifiez que votre clé API est correcte</li>';
            $html .= '<li>Créez un nouveau projet dans l\'interface Resemble.ai</li>';
            $html .= '<li>Vérifiez les permissions de votre clé API</li>';
            $html .= '</ul>';
            $html .= '</div>';
        }
        
        // Afficher la réponse brute pour debug
        $html .= '<details style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">';
        $html .= '<summary style="cursor: pointer; font-weight: bold;">🔍 Réponse API brute (debug)</summary>';
        $html .= '<pre style="background: white; padding: 15px; border-radius: 4px; overflow-x: auto; margin-top: 10px;">';
        $html .= htmlspecialchars(json_encode($data, JSON_PRETTY_PRINT));
        $html .= '</pre>';
        $html .= '</details>';
        
        return $html;
        
    } catch (\Exception $e) {
        return '<h1>❌ Exception PHP</h1>
                <p><strong>Message:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>
                <p><strong>Fichier:</strong> ' . htmlspecialchars($e->getFile()) . '</p>
                <p><strong>Ligne:</strong> ' . $e->getLine() . '</p>';
    }
}


public function createCustomVoice(Request $request)
{
    $request->validate([
        'voice_file' => 'required|file|mimes:mp3,wav|max:10240',
        'voice_name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'language' => 'nullable|string',
        'settings' => 'nullable|array'
    ]);

    $file = $request->file('voice_file');
    $path = $file->store('voices', 'public');

    $voice = Voice::create([
        'id' => Str::uuid(),
        'user_id' => Auth::id(),
        'voice_type' => 'human',
        'voice_name' => $request->voice_name,
        'voice_description' => $request->description,
        'language' => $request->language ?? 'fr',
        'settings' => $request->settings ?? ['vitesse' => 1, 'intonation' => 1, 'volume' => 1],
        'file_path' => $path,
    ]);

    return response()->json([
        'success' => true,
        'voice' => $voice
    ]);
}
// Dans AgentiaController.php
public function getCustomVoices()
{
    $userId = Auth::id();
    
    try {
        $customVoices = Voice::where('user_id', $userId)
                           ->where('voice_type', 'human')
                           ->orderBy('created_at', 'desc')
                           ->get(['id', 'voice_name', 'voice_description', 'language', 'file_path', 'settings', 'created_at']);
        
        // Formater les voix pour l'affichage
        $formattedVoices = $customVoices->map(function($voice) {
            return [
                'id' => $voice->id,
                'voice_name' => $voice->voice_name,
                'voice_description' => $voice->voice_description ?? 'Voix personnalisée',
                'language' => $voice->language ?? 'fr',
                'file_path' => $voice->file_path,
                'settings' => $voice->settings ?? ['vitesse' => 1, 'intonation' => 1, 'volume' => 1],
                'gender' => 'custom', // Pour l'affichage
                'created_at' => $voice->created_at->format('d/m/Y H:i'),
                'audio_url' => $voice->file_path ? asset('storage/' . $voice->file_path) : null,
            ];
        });
        
        Log::info("✅ Voix personnalisées chargées", [
            'user_id' => $userId,
            'count' => $formattedVoices->count()
        ]);
        
        return response()->json([
            'success' => true,
            'voices' => $formattedVoices,
            'count' => $formattedVoices->count()
        ]);
        
    } catch (\Exception $e) {
        Log::error('❌ Erreur chargement voix personnalisées', [
            'user_id' => $userId,
            'error' => $e->getMessage()
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors du chargement des voix personnalisées',
            'voices' => []
        ], 500);
    }
}


public function getVoiceByAvatar($avatarId)
{
    $voice = Voice::where('avatar_id', $avatarId)->first();

    if (!$voice) {
        return response()->json(['success' => false, 'message' => 'Voix non trouvée']);
    }

    return response()->json([
        'success' => true,
        'voice' => [
            'voice_name' => $voice->voice_name,
            'voice_description' => $voice->voice_description,
            'audio_url' => asset('storage/' . $voice->file_path),
        ]
    ]);
}

}
