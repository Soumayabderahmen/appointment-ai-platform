<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $categories = Categorie::all();
        return view('Admin.Categorie.ListeCategorie',['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('Admin.Categorie.AddCategorie');
    }

    

  
    /**
     * Show the form for editing the specified resource.
     */
     public function edit(string $id)
    {
        $categorie = Categorie::with([
            'subcategories:id,name,category_id'
        ])->findOrFail($id);

        return view('Admin.Categorie.EditCategorie', compact('categorie'));
    }

  
}
