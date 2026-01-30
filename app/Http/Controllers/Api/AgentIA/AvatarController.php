<?php

namespace App\Http\Controllers\Api\AgentIA;

use App\Http\Controllers\Controller;
use App\Models\Avatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AvatarController extends Controller
{
   public function store(Request $request)
    {
        $request->validate([
            'agent_i_a_id' => 'required|exists:agent_i_a_s,id',
            'name' => 'required|string|max:255',
            'domaine' => 'nullable|string|max:255',
            'prompt' => 'required|string|max:1000',
            'style' => 'required|in:réaliste,cartoon',
            'genre' => 'required|in:Femme,Homme,Autre',
            'tenue' => 'required|in:costume,sport',
        ]);

        // 🧠 Génération du prompt système via OpenAI
        $systemPrompt = <<<EOT
Tu es un générateur d'avatar 3D.

Détails de l'avatar :
- Nom : {$request->name}
- Domaine : {$request->domaine}
- Style : {$request->style}
- Genre : {$request->genre}
- Tenue : {$request->tenue}
- Description : {$request->prompt}

Génère une description d'avatar utilisable dans Ready Player Me.
EOT;

        $response = Http::withToken(config('services.openai.key'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'Tu es un assistant expert en avatars 3D.'],
                ['role' => 'user', 'content' => $systemPrompt],
            ],
            'temperature' => 0.6,
        ]);
        $appId = env('RPM_APP_ID');
        $domain = env('RPM_DOMAIN');
        $promptIA = $response['choices'][0]['message']['content'] ?? $request->prompt;

        // 🎨 Génération de l'URL iframe RPM
        $encodedPrompt = urlencode($promptIA);
        $rpmPreviewUrl = "https://{$domain}/avatar?appId={$appId}&frameApi&description={$encodedPrompt}";

        $avatar = Avatar::create([
            'user_id' => Auth::id(),
            'agent_i_a_id' => $request->agent_i_a_id,
            'name' => $request->name,
            'domaine' => $request->domaine,
            'prompt' => $request->prompt,
            'style' => $request->style,
            'genre' => $request->genre,
            'tenue' => $request->tenue,
            'system_prompt' => $promptIA,
            'preview_url' => $rpmPreviewUrl,
            'generation_method' => 'prompt',
        ]);

        return response()->json([
            'success' => true,
            'avatar' => $avatar,
        ]);
    }
}
