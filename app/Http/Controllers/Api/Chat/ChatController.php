<?php
namespace App\Http\Controllers\Api\Chat;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use App\Models\AgentIA;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
{
public function president(Request $request)
{
    // Pas besoin de @ suppressor — s'il y a une erreur on veut la voir dans les logs
    ignore_user_abort(true);
    set_time_limit(0);
    ini_set('max_execution_time', '0');

    $data = $request->validate([
        'message' => 'required|string',
        'context' => 'nullable|string',
    ]);

    $base = rtrim(config('services.agents.president_url'), '/');
    $url  = $base . '/president/answer';

    try {
        $resp = Http::withHeaders([
                'Accept' => 'application/json',
            ])
            // si l'agent stream: ->withOptions(['stream' => true])
            ->retry(2, 500)            // retentes légères
            ->connectTimeout(15)
            ->timeout(300)             // ↑ si calcul long
            ->post($url, [
                'question' => $data['message'],
                'context'  => $data['context'] ?? null,
            ]);

        if ($resp->failed()) {
            return response()->json([
                'error'   => 'Agent error',
                'status'  => $resp->status(),
                'details' => optional($resp)->json() ?? $resp->body(),
            ], $resp->status() ?: 502);
        }

        $payload = $resp->json() ?: ['raw' => $resp->body()];
        $text = data_get($payload, 'answer')
            ?? data_get($payload, 'evaluation')
            ?? data_get($payload, 'text')
            ?? json_encode($payload, JSON_UNESCAPED_UNICODE);

        return response()->json(['text' => $text, 'raw' => $payload]);

    } catch (\Illuminate\Http\Client\ConnectionException $e) {
        // Timeout / connexion / DNS
        Log::warning('President agent connection issue', [
            'url' => $url,
            'error' => $e->getMessage(),
        ]);
        return response()->json([
            'error' => 'Impossible de joindre l’agent',
            'hint'  => 'Vérifie AGENTS_PRESIDENT_URL (Docker? host.docker.internal?), et que /president/answer répond.',
            'details' => $e->getMessage(),
        ], 504);
    } catch (\Throwable $e) {
        Log::error('President agent unexpected error', [
            'url' => $url,
            'error' => $e->getMessage(),
        ]);
        return response()->json([
            'error' => 'Erreur interne lors de l’appel de l’agent',
            'details' => $e->getMessage(),
        ], 500);
    }
}

public function chatMessage($id)
{
    $agent = AgentIA::with([
        'avatar:id,agent_i_a_id,glb_url'
    ])->findOrFail($id);

        $path = $agent->avatar->glb_url ?? null;
    if ($path) {
        $path = str_replace('\\','/',$path);
        $path = preg_replace('#^/?(storage/app/public|public)/#','',$path);
        $path = ltrim($path,'/');
        $agent->avatar_url = Storage::url($path);
    } else {
        $agent->avatar_url = null;
    }


    return view('Chat', [
        'agent' => $agent
    ]);
}

public function ask(Request $request)
{
    $validated = $request->validate([
        'agent' => 'required|integer',
        'question' => 'required|string'
    ]);

    try {
        set_time_limit(0); // 🔑 pas de limite d’exécution PHP

        $response = Http::timeout(0)->post("http://127.0.0.1:8001/agent/chat", [
            'agent'    => $validated['agent'],
            'question' => $validated['question'],
        ]);

        if ($response->failed()) {
            return response()->json([
                'error'   => 'Python API error',
                'details' => $response->body()
            ], 500);
        }

        return $response->json();

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}
