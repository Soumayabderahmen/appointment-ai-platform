<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Funding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvestisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('Financement.liste', [
            'fundings' => Funding::where('user_id', 1)->get() // Utilisateur avec ID 1
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
return view('Financement.investisseurs');
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
    {
        $data = $request->all();

        // ⚡ On force le user_id connecté
$data['user_id'] = 1;
        // ⚡ On sauvegarde
        $funding = Funding::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Dispositif ajouté avec succès',
            'funding' => $funding
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
