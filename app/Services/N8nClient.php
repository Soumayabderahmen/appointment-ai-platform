<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Arr;
use Psr\Log\LoggerInterface;

class N8nClient
{
    protected string $baseUrl; // https://host/.../api/v1/
    protected string $apiKey;
    protected Client $http;
    protected ?LoggerInterface $log;

    public function __construct(LoggerInterface $log = null)
    {
        $this->log = $log;

        $raw = (string) config('services.n8n.base_url', '');
        $this->baseUrl = $this->normalizeBaseUrl($raw);
        $this->apiKey  = (string) config('services.n8n.api_key', '');

        if ($this->apiKey === '') {
            throw new \RuntimeException('Missing N8N API key (services.n8n.api_key).');
        }

        $this->http = new Client([
            'base_uri' => $this->baseUrl,
            'headers'  => [
                'X-N8N-API-KEY' => $this->apiKey,
                'Accept'        => 'application/json',
            ],
            'timeout'  => 15,
        ]);
    }

    private function normalizeBaseUrl(string $url): string
    {
        $url = trim($url);
        if ($url === '') throw new \RuntimeException('services.n8n.base_url is empty.');
        if (!preg_match('#^https?://#i', $url)) $url = 'https://' . ltrim($url, '/');
        $url = rtrim($url, '/');
        if (!preg_match('#/api/v\d+$#i', $url)) $url .= '/api/v1';
        return $url . '/';
    }

    /** ------------- HTTP helpers ------------- */
    private function getAllWithCursor(string $path, array $query = [], int $limit = 50 ,$noTimeout = false): array
    {
        $all = [];
        $cursor = null;

        do {
            $q = array_filter(['limit' => $limit, 'cursor' => $cursor]) + $query;
            $opts = ['query' => $q];
            if ($noTimeout) {
                $opts['timeout'] = 0;           // durée totale
                $opts['connect_timeout'] = 0;   // phase connexion
                // (facultatif) $opts['curl'] = [CURLOPT_TIMEOUT => 0, CURLOPT_CONNECTTIMEOUT => 0];
            }
            $res  = $this->http->get(ltrim($path, '/'), ['query' => $q]);
            $data = json_decode((string) $res->getBody(), true);

            $items = is_array($data) && array_is_list($data)
                ? $data
                : (Arr::get($data, 'data', []) ?: []);

            $all    = array_merge($all, $items);
            $cursor = Arr::get($data, 'nextCursor');
        } while ($cursor);

        return $all;
    }

    /** ------------- API n8n ------------- */
    public function listWorkflowsAll(): array
    {
        $list = $this->getAllWithCursor('workflows');
        if ($this->log) $this->log->debug('[n8n] listWorkflowsAll count=' . count($list));
        return $list;
    }

    public function listWorkflowsByProject(string $projectId): array
    {
        $list = $this->getAllWithCursor('workflows', ['projectId' => $projectId]);
        if ($this->log) $this->log->debug("[n8n] listWorkflowsByProject({$projectId}) count=" . count($list));
        return $list;
    }

    private function tryListByProjectId(string $projectId): ?array
    {
        if ($projectId === '') return null;
        try {
            return $this->listWorkflowsByProject($projectId);
        } catch (\Throwable $e) {
            if ($this->log) $this->log->warning("[n8n] projectId query unsupported: {$e->getMessage()}");
            return null;
        }
    }

    /** ------------- Utils ------------- */
    private function extractTags(array $wf): array
    {
        $tags = Arr::get($wf, 'tags', []);
        if (!is_array($tags)) $tags = [];
        return array_values(array_filter(array_map(function ($t) {
            if (is_string($t)) return strtolower($t);
            return strtolower((string) (Arr::get($t, 'name') ?? ''));
        }, $tags)));
    }

    private function belongsToOwner(array $wf, ?string $ownerEmail, ?string $ownerId): bool
    {
        $ownerEmail = $ownerEmail ? strtolower($ownerEmail) : null;

        // ownedBy / createdBy
        $ownerIdInWf = (string) (Arr::get($wf, 'ownedBy.id')
            ?? Arr::get($wf, 'ownerId')
            ?? Arr::get($wf, 'createdBy.id')
            ?? Arr::get($wf, 'createdById')
            ?? '');

        $ownerEmailInWf = strtolower((string) (Arr::get($wf, 'ownedBy.email')
            ?? Arr::get($wf, 'createdBy.email')
            ?? ''));

        if ($ownerId && $ownerIdInWf && $ownerIdInWf === $ownerId) return true;
        if ($ownerEmail && $ownerEmailInWf && $ownerEmailInWf === $ownerEmail) return true;

        // sharedWith
        $shared = Arr::get($wf, 'sharedWith', []);
        if (!is_array($shared)) $shared = [];
        foreach ($shared as $s) {
            $sid    = (string) (Arr::get($s, 'user.id') ?? Arr::get($s, 'userId') ?? Arr::get($s, 'id') ?? '');
            $semail = strtolower((string) (Arr::get($s, 'user.email') ?? Arr::get($s, 'email') ?? ''));
            if ($ownerId && $sid === $ownerId) return true;
            if ($ownerEmail && $semail && $semail === $ownerEmail) return true;
        }

        // fallback par TAG
        $tags = $this->extractTags($wf);
        if ($ownerEmail && in_array('owner:'.$ownerEmail, $tags, true)) return true;
        if ($ownerId    && in_array('owner:'.strtolower($ownerId), $tags, true)) return true;

        return false;
    }

    /** ------------- MES WORKFLOWS (robuste) ------------- */
    public function listMyWorkflows(
        ?string $ownerEmail = null,
        ?string $ownerId = null,
        ?bool $onlyActive = null,
        ?string $projectId = null
    ): array {
        $ownerEmail = strtolower($ownerEmail ?? (string) config('services.n8n.owner_email', ''));
        $ownerId    = (string) ($ownerId ?? (string) config('services.n8n.owner_id', ''));
        $projectId  = (string) ($projectId ?? $ownerId); // chez toi, ownerId == id du projet "Personal"

        if (!$ownerEmail && !$ownerId) {
            if ($this->log) $this->log->warning('[n8n] listMyWorkflows called without owner');
            return [];
        }

        // 1) Essai direct par projectId (souvent OK pour "Personal")
        if ($projectId) {
            if (($byProject = $this->tryListByProjectId($projectId)) !== null) {
                $list = $byProject;
                if (!is_null($onlyActive)) {
                    $list = array_values(array_filter($list, fn ($w) => (bool) ($w['active'] ?? false) === $onlyActive));
                }
                if ($this->log) $this->log->debug("[n8n] listMyWorkflows via projectId={$projectId} -> " . count($list));
                return $list;
            }
        }

        // 2) Fallback : on tire tout, puis on filtre
        $all = $this->listWorkflowsAll();

        // 2.a Si le champ projectId existe sur les items → on filtre dessus en priorité
        $hasProjectKey = false;
        foreach ($all as $wf) { if (array_key_exists('projectId', $wf)) { $hasProjectKey = true; break; } }

        if ($hasProjectKey && $projectId) {
            $subset = array_values(array_filter($all, fn ($w) =>
                (string) ($w['projectId'] ?? '') === $projectId
            ));
            if (!is_null($onlyActive)) {
                $subset = array_values(array_filter($subset, fn ($w) => (bool) ($w['active'] ?? false) === $onlyActive));
            }
            if ($this->log) $this->log->debug("[n8n] listMyWorkflows via ALL+projectId filter -> " . count($subset));
            return $subset;
        }

        // 2.b Sinon → filtre par appartenance (owner / shared / tag)
        $subset = array_values(array_filter($all, fn ($w) =>
            $this->belongsToOwner($w, $ownerEmail, $ownerId)
        ));
        if (!is_null($onlyActive)) {
            $subset = array_values(array_filter($subset, fn ($w) => (bool) ($w['active'] ?? false) === $onlyActive));
        }
        if ($this->log) $this->log->debug("[n8n] listMyWorkflows via ALL+owner filter -> " . count($subset));
        return $subset;
    }

    /** ------------- MES PROJETS (déduits) ------------- */
    public function listMyProjects(?string $ownerEmail = null, ?string $ownerId = null): array
    {
        $ownerEmail = strtolower($ownerEmail ?? (string) config('services.n8n.owner_email', ''));
        $ownerId    = (string) ($ownerId ?? (string) config('services.n8n.owner_id', ''));

        // d’abord, essaye “Personal” via projectId (souvent ton cas)
        $projects = [];
        if ($ownerId && ($byProject = $this->tryListByProjectId($ownerId)) !== null) {
            $projects['personal'] = [
                'id'        => $ownerId,
                'type'      => 'personal',
                'name'      => 'Personal',
                'updatedAt' => $this->maxUpdatedAt($byProject),
            ];
        }

        // Ensuite, récupère mes workflows (tous), et déduis d’autres projets s’il y en a
        $myWf = $this->listMyWorkflows($ownerEmail, $ownerId, null, $ownerId);
        foreach ($myWf as $wf) {
            $pid = (string) ($wf['projectId'] ?? '');
            $key = $pid !== '' ? $pid : 'personal';

            if (!isset($projects[$key])) {
                $projects[$key] = [
                    'id'        => $key,
                    'type'      => ($key === 'personal') ? 'personal' : 'project',
                    'name'      => ($key === 'personal') ? 'Personal' : ('Project ' . $pid),
                    'updatedAt' => $wf['updatedAt'] ?? null,
                ];
            } else {
                $u = $wf['updatedAt'] ?? null;
                if ($u && (!$projects[$key]['updatedAt'] || $u > $projects[$key]['updatedAt'])) {
                    $projects[$key]['updatedAt'] = $u;
                }
            }
        }

        // UI URLs
        $host = preg_replace('#/api/v\\d+/?$#i', '', rtrim($this->baseUrl, '/'));
        foreach ($projects as $k => $p) {
            $projects[$k]['uiUrl'] = $p['type'] === 'personal'
                ? "{$host}/projects/{$p['id']}/workflows"
                : "{$host}/projects/{$p['id']}/workflows";
        }

        // format final
        return array_values($projects);
    }

    private function maxUpdatedAt(array $workflows): ?string
    {
        $max = null;
        foreach ($workflows as $wf) {
            $u = $wf['updatedAt'] ?? null;
            if ($u && (!$max || $u > $max)) $max = $u;
        }
        return $max;
    }

    /** ----------- Mapping pour l’UI ----------- */
    public function mapProjectsForList(array $projects): array
    {
        return array_map(fn ($p) => [
            'id'        => (string) ($p['id'] ?? ''),
            'name'      => (string) ($p['name'] ?? 'Sans nom'),
            'type'      => (string) ($p['type'] ?? ''), // personal | project
            'updatedAt' => $p['updatedAt'] ?? null,
            'uiUrl'     => $p['uiUrl'] ?? null,
        ], $projects);
    }
/** Retourne TOUTES les Sticky Notes du workflow.
 * Chaque item contient: name, raw (contenu brut), markdown (extrait entre balises si présent).
 */
private function extractStickyNotes(array $wf): array
{
    $nodes = Arr::get($wf, 'nodes', []);
    if (!is_array($nodes)) return [];

    $out = [];
    foreach ($nodes as $n) {
        $type = strtolower((string) Arr::get($n, 'type', ''));
        if (!str_contains($type, 'stickynote')) continue;

        $raw = (string) (Arr::get($n, 'parameters.content')
            ?? Arr::get($n, 'parameters.text')
            ?? '');

        if ($raw === '') continue;

        // Si des balises sont présentes, on isole le markdown doc
        $md = $raw;
        if (preg_match('/<!--\s*N8N-DESC-START\s*-->([\s\S]*?)(?:<!--\s*N8N-DESC-END\s*-->|$)/i', $raw, $m)) {
            $md = trim($m[1]);
        } else {
            $md = trim($md);
        }

        $out[] = [
            'name'     => (string) Arr::get($n, 'name', 'Sticky Note'),
            'raw'      => $raw,
            'markdown' => $md,
        ];
    }
    return $out;
}

    public function mapWorkflowsForList(array $workflows): array
    {
        $host = preg_replace('#/api/v\\d+/?$#i', '', rtrim($this->baseUrl, '/'));
        return array_map(function ($wf) use ($host) {
            $id = (string) ($wf['id'] ?? $wf['_id'] ?? '');
            return [
                'id'        => $id,
                'name'      => $wf['name'] ?? 'Sans nom',
                'active'    => (bool) ($wf['active'] ?? false),
                'updatedAt' => $wf['updatedAt'] ?? null,
                'projectId' => $wf['projectId'] ?? null,
                'tags'      => $wf['tags'] ?? [],
                'editorUrl' => "{$host}/workflow/{$id}",
            ];
        }, $workflows);
    }



    // + use Illuminate\Support\Str; en haut si tu l'utilises ailleurs

/** Obtenir le JSON complet d’un workflow */
public function getWorkflow(string $id): array
{
    $res = $this->http->get('workflows/' . rawurlencode($id));
    return json_decode((string) $res->getBody(), true) ?: [];
}


/** Description principale à afficher pour le workflow.
 *  Priorité:
 *   1) première Sticky Note avec balises N8N-DESC-START/END
 *   2) sinon première Sticky Note (contenu brut)
 *   3) sinon concat des notes de nœuds "notesInFlow"
 */
private function extractStickyDescription(array $wf): ?string
{
    // 1) Sticky notes
    $notes = $this->extractStickyNotes($wf);
    if ($notes) {
        // a) on préfère une note avec markdown explicite
        foreach ($notes as $sn) {
            if ($sn['markdown'] !== '') {
                return $sn['markdown'];
            }
        }
        // b) sinon on prend la première (brut)
        return $notes[0]['raw'] !== '' ? $notes[0]['raw'] : null;
    }

    // 2) Fallback: notes de nœuds affichées dans le flow
    $nodes = Arr::get($wf, 'nodes', []);
    if (!is_array($nodes)) return null;

    $fallback = [];
    foreach ($nodes as $n) {
        if (!empty($n['notesInFlow']) && !empty($n['notes'])) {
            $fallback[] = trim((string) $n['notes']);
        }
    }
    $joined = trim(implode("\n\n", array_filter($fallback)));
    return $joined !== '' ? $joined : null;
}



/** Extraire infos webhook (méthode, path, URLs test/prod) */
public function extractWebhookInfoFromNodes(array $wf): ?array
{
    $nodes = Arr::get($wf, 'nodes', []);
    if (!is_array($nodes)) return null;

    foreach ($nodes as $n) {
        $type = strtolower((string) Arr::get($n, 'type', ''));
        if (str_contains($type, 'webhook')) {
            $path   = Arr::get($n, 'parameters.path');
            $method = strtoupper((string) (Arr::get($n, 'parameters.httpMethod', 'POST')));
            if ($path) {
                $host = preg_replace('#/api/v\\d+/?$#i', '', rtrim($this->baseUrl, '/'));
                return [
                    'method' => $method,
                    'path'   => $path,
                    'test'   => "{$host}/webhook-test/{$path}",
                    'prod'   => "{$host}/webhook/{$path}",
                ];
            }
        }
    }
    return null;
}

/** Détail d’un workflow → format carte UI (avec description + webhook) */
private function mapWorkflowDetailForList(array $wf): array
{
    $id   = (string) ($wf['id'] ?? $wf['_id'] ?? '');
    $host = preg_replace('#/api/v\\d+/?$#i', '', rtrim($this->baseUrl, '/'));
    $hook = $this->extractWebhookInfoFromNodes($wf);

    return [
        'id'        => $id,
        'name'      => $wf['name'] ?? 'Sans nom',
        'active'    => (bool) ($wf['active'] ?? false),
        'updatedAt' => $wf['updatedAt'] ?? null,
        'projectId' => $wf['projectId'] ?? null,
        'tags'      => $wf['tags'] ?? [],
        'editorUrl' => "{$host}/workflow/{$id}",

        // 👉 Description principale (markdown si balises, sinon brut)
        'description'       => $this->extractStickyDescription($wf),

        // 👉 TOUTES les Sticky Notes (pour affichage/onglet “Docs”)
        'sticky_notes'      => $this->extractStickyNotes($wf),

        // Webhook
        'webhook_method'    => $hook['method'] ?? null,
        'webhook_path'      => $hook['path'] ?? null,
        'webhook_url'       => $hook['prod'] ?? null,
        'webhook_test_url'  => $hook['test'] ?? null,

        // Paramètres
        'params' => [
            'contract'         => $this->buildContractFromFunctionNode($wf),
            'nodes_parameters' => $this->extractNodeParameters($wf),
        ],
    ];
}


/** Liste par projet → version “détaillée” (GET chaque workflow pour avoir nodes) */
public function listWorkflowsByProjectDetailed(string $projectId): array
{
    $list = $this->listWorkflowsByProject($projectId); // liste “light”
    $out  = [];

    foreach ($list as $row) {
        $id = (string) ($row['id'] ?? $row['_id'] ?? '');
        if (!$id) continue;

        try {
            $wf = $this->getWorkflow($id); // JSON complet
            $out[] = $this->mapWorkflowDetailForList($wf);
        } catch (\Throwable $e) {
            if ($this->log) $this->log->warning("[n8n] getWorkflow($id) failed: ".$e->getMessage());
        }
    }
    return $out;
}
/** Un nœud dont le type contient $needle ? */
private function hasNodeType(array $wf, string $needle): bool
{
    $nodes = Arr::get($wf, 'nodes', []);
    if (!is_array($nodes)) return false;
    foreach ($nodes as $n) {
        $t = strtolower((string) Arr::get($n, 'type', ''));
        if (strpos($t, strtolower($needle)) !== false) return true;
    }
    return false;
}

/** Parcourt les nœuds et retourne leurs paramètres bruts (hors Sticky Note) */
private function extractNodeParameters(array $wf): array
{
    $nodes = Arr::get($wf, 'nodes', []);
    if (!is_array($nodes)) return [];

    $out = [];
    foreach ($nodes as $n) {
        $type = (string) Arr::get($n, 'type', '');
        // on évite la sticky note qui sert à la doc
        if (stripos($type, 'stickynote') !== false) {
            continue;
        }
        $out[] = [
            'name'       => Arr::get($n, 'name', ''),
            'type'       => $type,
            'parameters' => Arr::get($n, 'parameters', []),
        ];
    }
    return $out;
}

/** Retrouve le code du nœud Function (Prepare & Validate) s'il existe */
private function getFunctionNodeCode(array $wf): ?string
{
    $nodes = Arr::get($wf, 'nodes', []);
    if (!is_array($nodes)) return null;

    foreach ($nodes as $n) {
        $type = strtolower((string) Arr::get($n, 'type', ''));
        if (str_contains($type, 'n8n-nodes-base.function')) {
            $code = Arr::get($n, 'parameters.functionCode');
            if ($code) return (string) $code;
        }
    }
    return null;
}
/** Contrat pour workflow Email (SMTP) */
private function buildEmailContract(): array
{
    $add = function (string $name, string $type, bool $required = false, $default = null, string $desc = '') {
        $d = $desc;
        if ($default !== null) {
            $d .= ($d ? ' ' : '') . '[défaut: ' . (is_bool($default) ? ($default ? 'true' : 'false') : (string) $default) . ']';
        }
        return ['name' => $name, 'type' => $type, 'required' => $required, 'description' => $d];
    };

    return [
        $add('recepteur', 'string|string[]', true, null, "Destinataire(s). Synonymes acceptés: to, destinataire, email_to, email (séparés par , ou ;)"),
        $add('emetteur', 'string', false, null, "Expéditeur. Synonymes: from, sender, email_from (facultatif si défini dans les credentials SMTP)"),
        $add('subject', 'string', false, 'Sans sujet', "Synonyme: sujet"),
        $add('contenu', 'string', false, null, "Corps texte brut. Synonymes: message, text"),
        $add('html', 'string', false, null, "Corps HTML. Synonyme: htmlBody"),
    ];
}

/** Contrat pour workflow Google Calendar */
private function buildCalendarContract(): array
{
    $add = function (string $name, string $type, bool $required = false, $default = null, string $desc = '') {
        $d = $desc;
        if ($default !== null) {
            $d .= ($d ? ' ' : '') . '[défaut: ' . (is_bool($default) ? ($default ? 'true' : 'false') : (string) $default) . ']';
        }
        return ['name' => $name, 'type' => $type, 'required' => $required, 'description' => $d];
    };

    return [
        $add('title', 'string', true, null, "Titre de l’événement"),
        $add('start', 'string (ISO-8601)', false, null, "Requis si vous n’envoyez pas startDate+startClock ni startAfterMinutes"),
        $add('startDate', 'date (YYYY-MM-DD)'),
        $add('startClock', 'string (HH:mm)'),
        $add('startAfterMinutes', 'number'),
        $add('end', 'string (ISO-8601)'),
        $add('durationMinutes', 'number', false, 60, "Utilisé si end absent"),
        $add('timezone', 'string', false, 'Africa/Tunis'),
        $add('location', 'string'),
        $add('description', 'string'),
        $add('attendees', 'string[]'),
        $add('reminderMinutes', 'number', false, 30),
        $add('useNativeEmail', 'boolean', false, true),
        $add('sendCustomEmail', 'boolean', false, false, "Désactivé si aucun destinataire"),
        $add('reminderTo', 'string[]'),
        $add('emailSubject', 'string'),
        $add('emailBody', 'string'),
        $add('emailChannel', 'string', false, 'smtp'),
    ];
}

/** Contrat pour workflow Google Drive Upload */
private function buildDriveUploadContract(): array
{
    $add = function (string $name, string $type, bool $required = false, $default = null, string $desc = '') {
        $d = $desc;
        if ($default !== null) {
            $d .= ($d ? ' ' : '') . '[défaut: ' . (is_bool($default) ? ($default ? 'true' : 'false') : (string) $default) . ']';
        }
        return ['name' => $name, 'type' => $type, 'required' => $required, 'description' => $d];
    };

    return [
        $add('file', 'multipart file', true, null, 'Clé form-data = "file" (binaire)'),
        $add('folderId', 'string', false, 'root', 'Optionnel si folderUrl fourni'),
        $add('folderUrl', 'string', false, null, 'Extrait automatiquement l’ID (…/folders/{ID} ou …?id={ID})'),
        $add('driveId', 'string', false, null, 'Optionnel (peut être extrait de l’URL via drive_id=…)'),
        $add('fileName', 'string', false, 'upload.bin'),
        $add('mimeType', 'string', false, 'application/octet-stream'),
    ];
}

private function buildContractFromFunctionNode(array $wf): array
{
    $code = $this->getFunctionNodeCode($wf) ?? '';

    // 1) EMAIL: nœud emailSend OU indices dans le code (recepteur/fromEmail/toEmail/htmlBody...)
    $isEmail = $this->hasNodeType($wf, 'n8n-nodes-base.emailSend')
             || preg_match('/recepteur|email_to|toEmail|fromEmail|htmlBody/i', $code);
    if ($isEmail) {
        return $this->buildEmailContract();
    }

    // 2) SLIDES (détection existante)
    $isSlides = $this->hasNodeType($wf, 'slides') // s’il existe un nœud dédié (selon ton flow)
             || stripos($code, 'createSlide') !== false
             || stripos($code, 'slides.googleapis.com') !== false
             || stripos($code, 'presentation') !== false
             || stripos($code, 'createRequests') !== false;
    if ($isSlides) {
        return $this->buildSlidesContract();
    }

    // 3) DRIVE UPLOAD
    $isDriveUpload = $this->hasNodeType($wf, 'n8n-nodes-base.googleDrive')
                   || preg_match('/binary\.file|folderId|folderUrl|driveId/i', $code);
    if ($isDriveUpload) {
        return $this->buildDriveUploadContract();
    }

    // 4) CALENDAR
    $isCalendar = $this->hasNodeType($wf, 'n8n-nodes-base.googleCalendar')
                 || preg_match('/startClock|startDate|attendees|calendarReminders/i', $code);
    if ($isCalendar) {
        return $this->buildCalendarContract();
    }

    // 5) Fallback très neutre
    return [];
}


/** Contrat pour le workflow Google Slides */
private function buildSlidesContract(): array
{
    $add = function (string $name, string $type, bool $required = false, $default = null, string $desc = '') {
        $d = $desc;
        if ($default !== null) {
            $d .= ($d ? ' ' : '') . '[défaut: ' . (is_bool($default) ? ($default ? 'true' : 'false') : (string) $default) . ']';
        }
        return ['name' => $name, 'type' => $type, 'required' => $required, 'description' => $d];
    };

    return [
        // IDs
        $add('templateId', 'string', false, null, 'Obligatoire si templateUrl absent'),
        $add('templateUrl', 'string', false, null, 'Obligatoire si templateId absent (extrait automatiquement l’ID)'),
        $add('folderId', 'string', false, 'root', 'Optionnel si folderUrl fourni'),
        $add('folderUrl', 'string', false, null, 'Optionnel (extrait automatiquement l’ID)'),

        // Contenu
        $add('title', 'string', false, 'Nouvelle présentation'),
        $add('subtitle', 'string'),
        $add('outline', 'array|object', false, null, "Plan de la présentation. Exemple array: [{title:'Intro', bullets:['pt1','pt2']}, ...]. Si object, il sera converti en array de sections."),
        $add('images', 'object', false, null, "Ressources images facultatives. Ex: { \"logo\": \"https://.../logo.png\" }"),
    ];
}

}
