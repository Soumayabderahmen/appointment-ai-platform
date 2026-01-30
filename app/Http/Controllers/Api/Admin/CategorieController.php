<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;

class CategorieController extends Controller
{
   



    public function store(Request $request)
    {
        // Validation
        $validated = $request->validate([
            'name' => ['required','string','max:255','unique:categories,name'],
            'subcategories' => ['sometimes','array'],
            'subcategories.*' => ['nullable','string','max:255','distinct'],
        ]);

        // Nettoyage + déduplication locale
        $subNames = collect($validated['subcategories'] ?? [])
            ->map(fn ($s) => trim((string)$s))
            ->filter()          // supprime vides
            ->unique()          // supprime doublons de l'input
            ->values();

        // Transaction: crée la catégorie + ses sous-catégories
        $category = DB::transaction(function () use ($validated, $subNames) {
            $category = Categorie::create([
                'name' => $validated['name'],
            ]);

            if ($subNames->isNotEmpty()) {
                $category->subcategories()->createMany(
                    $subNames->map(fn ($n) => ['name' => $n])->all()
                );
            }

            return $category->load([
                'subcategories' => fn ($q) => $q->select('id','name','category_id')
                                                ->orderBy('name'),
            ]);
        });

        return response()->json($category, 201);
    }

 public function show(Categorie $category)
    {
        // Eager load des sous-catégories avec colonnes utiles
        $category->load([
            'subcategories' => function ($q) {
                $q->select('id', 'name', 'category_id', 'created_at')
                  ->orderBy('name');
            }
        ]);

        // Réponse “propre” pour ton front (ID, name, created_at, subcategories[])
        return response()->json([
            'id'          => $category->id,
            'name'        => $category->name,
            'created_at'  => $category->created_at,
            'subcategories' => $category->subcategories->map(fn ($s) => [
                'id'          => $s->id,
                'name'        => $s->name,
                'category_id' => $s->category_id,
                'created_at'  => $s->created_at,
            ])->values(),
        ], 200);
    }

   
    public function update(Request $request, Categorie $category)
    {
        $validated = $request->validate([
            'name' => [
                'required','string','max:255',
                Rule::unique('categories','name')->ignore($category->id),
            ],
            'subcategories'   => ['sometimes','array'],
            'subcategories.*' => ['nullable','string','max:255','distinct'],
        ]);

        // Nettoyage + déduplication (insensible à la casse)
        $desired = collect($validated['subcategories'] ?? [])
            ->map(fn($s) => trim((string)$s))
            ->filter()
            ->unique(fn($s) => mb_strtolower($s))
            ->values();

        $result = DB::transaction(function () use ($category, $validated, $desired) {
            // 1) MAJ du nom
            $category->update(['name' => $validated['name']]);

            // 2) Sync des sous-catégories par NOM (insensible à la casse)
            $existing = $category->subcategories()->get(['id','name']);

            $existingByLower = $existing->mapWithKeys(
                fn($s) => [mb_strtolower($s->name) => $s]
            );

            $desiredLower = $desired->map(fn($n) => mb_strtolower($n));

            // a) Créer celles qui manquent
            $toCreate = $desired->filter(fn($n) => !$existingByLower->has(mb_strtolower($n)))
                                ->map(fn($n) => ['name' => $n])
                                ->values();
            if ($toCreate->isNotEmpty()) {
                $category->subcategories()->createMany($toCreate->all());
            }

            // b) Mettre à jour la casse si nécessaire
            foreach ($desired as $n) {
                $lower = mb_strtolower($n);
                if ($existingByLower->has($lower)) {
                    $s = $existingByLower->get($lower);
                    if ($s->name !== $n) {
                        $s->update(['name' => $n]);
                    }
                }
            }

            // c) Supprimer celles qui ne sont plus dans la liste désirée
            $toDeleteIds = $existing->filter(
                fn($s) => !$desiredLower->contains(mb_strtolower($s->name))
            )->pluck('id');
            if ($toDeleteIds->isNotEmpty()) {
                $category->subcategories()->whereIn('id', $toDeleteIds)->delete();
            }

            // 3) Retourner la catégorie + sous-catégories
            return $category->load([
                'subcategories' => fn($q) => $q->select('id','name','category_id','created_at')
                                               ->orderBy('name'),
            ]);
        });

        return response()->json($result, 200);
    }

    public function destroy(string $id)
    {
          try {
            // Si tes FK ne sont PAS en cascade, décommente la ligne suivante
            // $category->subcategories()->delete();

$category = Categorie::findOrFail($id);
$category->delete();
            return response()->json(['ok' => true, 'message' => 'Catégorie supprimée'], 200);
        } catch (QueryException $e) {
            return response()->json([
                'ok' => false,
                'message' => "Suppression impossible : des éléments y sont liés."
            ], 409);
        }
    }
  public function destroySubcategory(string $id){
        try {
            $subcategory = DB::table('subcategories')->where('id', $id)->first();
            if (!$subcategory) {
                return response()->json(['ok' => false, 'message' => 'Sous-catégorie non trouvée'], 404);
            }

            DB::table('subcategories')->where('id', $id)->delete();

            return response()->json(['ok' => true, 'message' => 'Sous-catégorie supprimée'], 200);
        } catch (QueryException $e) {
            return response()->json([
                'ok' => false,
                'message' => "Suppression impossible : des éléments y sont liés."
            ], 409);
        }
  }
}
