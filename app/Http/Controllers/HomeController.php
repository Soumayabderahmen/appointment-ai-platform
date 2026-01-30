<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\AgentIA;
use App\Models\Categorie;
use App\Models\Funding;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HomeController extends Controller
{

    public function coach()
    {
        $coaches= User::where('role', 'coach')
   
    ->with('coach')->get();
        return view('Home.coach',compact(
            'coaches'
        ));
    }
   
    public function agentia()
    {
         $mesagents = AgentIA::with(['avatar:id,agent_i_a_id,glb_url'])
        ->select('id','user_id','nom','type','description','category_id','subcategory_id')
        
        ->latest()
        ->get()
        ->map(function ($a) {
            // BDD: "avatars/xxx.glb" -> URL absolue: "https(s)://host/storage/avatars/xxx.glb"
            $path = $a->avatar->glb_url ?? null;

            // 1) on s’assure d’avoir "avatars/xxx.glb" (sans "storage/app/public")
            if ($path) {
                $path = str_replace('\\', '/', $path);
                $path = preg_replace('#^/?storage/app/public/#', '', $path);
                $path = preg_replace('#^/?public/#', '', $path);
                $path = ltrim($path, '/');
            }

            // 2) URL absolue fiable (respecte http/https)
            $a->avatar_url = $path ? asset('storage/'.$path) : null;

            return $a;
        });

   

    $categories = Categorie::select('id','name')->orderBy('name')->get();


        return view('Home.agentia',compact(
            'mesagents','categories'
        ));

    }

public function show($id)
{
    // Charger l’agent avec avatar + sections + tasks
    $agent = AgentIA::with(['avatar', 'sousTitres.responsabilites'])->findOrFail($id);

    // Construire une URL exploitable pour l'avatar
    $path = $agent->avatar->glb_url ?? null;
    if ($path) {
        $path = str_replace('\\', '/', $path);
        if (Str::startsWith($path, ['http://', 'https://'])) {
            $agent->avatar_url = $path;
        } else {
            $path = preg_replace('#^/?storage/app/public/#', '', $path);
            $path = preg_replace('#^/?public/#', '', $path);
            $path = ltrim($path, '/');
            $agent->avatar_url = asset('storage/'.$path);
        }
    } else {
        $agent->avatar_url = null;
    }

    // Suggestions (facultatif)
    $suggestedAgents = AgentIA::where('id', '!=', $id)
        ->inRandomOrder()
        ->take(3)
        ->get();

    return view('Home.agentia2', compact('agent', 'suggestedAgents'));
}

public function mentions()
    {
        return view('Layouts.HomeView.mentions');
    }

     public function contact()
    {
        return view('Home.Contact');
    }

         public function investisseurs()
    {
        $fundings=Funding::all();
        return view('Home.investisseur' ,[
            'fundings' => $fundings
        ]);
    }
}