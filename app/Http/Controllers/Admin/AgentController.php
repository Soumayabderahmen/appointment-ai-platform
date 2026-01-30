<?php

namespace App\Http\Controllers\Admin;

use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index()
    {
        $agents = Agent::all();
        return view('Admin.agentIA.ListAgent',[
            'agents' => $agents,
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    return view('Admin.agentIa.ListAgent');
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $agent = Agent::with('sections.tasks')->findOrFail($id);
      return view('Admin.agentIA.DetailsAgent', compact('agent'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }





}
