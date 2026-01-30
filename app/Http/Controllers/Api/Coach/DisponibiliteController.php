<?php

namespace App\Http\Controllers\Api\Coach;

use App\Http\Controllers\Controller;
use App\Models\Coach;
use App\Models\Disponibilite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use DateTime;
use Illuminate\Support\Facades\DB;

class DisponibiliteController extends Controller {

 public function store(Request $request)
    {
        $request->validate([
            'coach_id' => 'required|exists:coach,id',
            'day_of_week' => 'nullable|string',
            'date' => 'nullable|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'statut' => 'required|in:available,unavailable',
            'honoraire' => 'nullable|numeric',
            'nb_place' => 'nullable|integer|min:1',
            'titre' => 'nullable|string|max:255',
        ]);

        $coach = Coach::findOrFail($request->coach_id);

        if (Auth::id() !== $coach->user_id) {
            return response()->json(['error' => 'Accès non autorisé'], 403);
        }

        $exists = Disponibilite::where('coach_id', $coach->id)
            ->where('date', $request->date)
            ->where('start_time', $request->start_time)
            ->where('end_time', $request->end_time)
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'Ce créneau est déjà enregistré.'], 409);
        }

      $availability =  Disponibilite::create([
            'coach_id' => $coach->id,
            'day_of_week' => $request->day_of_week,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'statut' => $request->statut,
            'honoraire' => $request->honoraire,
            'nb_place' => $request->nb_place,
            'titre' => $request->titre,
        ]);

        return response()->json(['message' => 'Disponibilité ajoutée avec succès.','availability' => $availability], 201);
    }

protected function formatTime($time)
{
    // Format HH:MM ou HH:MM:SS → HH:MM:00
    if (strlen($time) === 5) {
        return $time . ':00';
    }
    if (strlen($time) === 8) {
        return substr($time, 0, 5) . '00';
    }
    return null;
}

protected function getDayOfWeek($date)
{
    $days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return $days[(new DateTime($date))->format('w')];
}


   public function updateTimes(Request $request, $id)
{
    $availability = Disponibilite::findOrFail($id);

    // Vérification d'accès
    if (Auth::user()->coach->id !== $availability->coach_id) {
        return back()->withErrors(['error' => 'Accès non autorisé']);
    }

    // Nettoyage et préparation des données
    $cleanedData = [
        'date' => $request->date,
        'start_time' => $request->start_time ? $this->formatTime($request->start_time) : null,
        'end_time' => $request->end_time ? $this->formatTime($request->end_time) : null,
        'day_of_week' => $request->date ? $this->getDayOfWeek($request->date) : null,
        'honoraire' => $request->honoraire ,
        'nb_place' => $request->nb_place,
        'titre' => $request->titre,
    ];

    // Validation
    $validator = Validator::make($cleanedData, [
        'date' => 'required|date',
        'day_of_week' => 'required|string|max:20',
        'start_time' => 'required|date_format:H:i:s',
        'end_time' => 'required|date_format:H:i:s|after:start_time',
         'honoraire' => 'nullable|numeric|min:0',
        'nb_place' => 'nullable|integer|min:1',
        'titre' => 'nullable|string|max:255', // ✅ Validation titre
    ], [
        'date.required' => 'La date est obligatoire',
        'start_time.required' => 'L\'heure de début est obligatoire',
        'start_time.date_format' => 'Le format de l\'heure doit être HH:MM',
        'end_time.required' => 'L\'heure de fin est obligatoire',
        'end_time.date_format' => 'Le format de l\'heure doit être HH:MM',
        'end_time.after' => 'L\'heure de fin doit être après l\'heure de début',
        'honoraire.numeric' => 'L\'honoraire doit être un nombre',
        'honoraire.min' => 'L\'honoraire doit être supérieur ou égal à 0',
        'nb_place.integer' => 'Le nombre de places doit être un entier',
        'nb_place.min' => 'Le nombre de places doit être supérieur ou égal à 1',
        'titre.max' => 'Le titre ne peut pas dépasser 255 caractères',

    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }
    
    $availability->update($cleanedData);
    
    return response()->json(['success' => true, 'message' => 'Disponibilité mise à jour avec succès.','availability' => $availability,]);
    
}
    public function updateStatus(Request $request, $id)
{
    $availability = Disponibilite::findOrFail($id);

    // Vérifier si l'utilisateur est bien le coach concerné
    if (Auth::user()->coach->id !== $availability->coach_id) {
        return response()->json(['error' => 'Accès non autorisé'], 403);
    }

    // Validation uniquement pour le statut
    $request->validate([
        'statut' => 'required|in:available,unavailable',
    ]);

    // Mise à jour du statut uniquement
    $availability->update([
        'statut' => $request->statut,
    ]);

    return response()->json(['success' => true, 'message' => 'Statut mis à jour avec succès.', 'availability' => $availability], 200);
}

 public function destroy($id)
    {
        $availability = Disponibilite::findOrFail($id);

        // Vérifier si l'utilisateur est bien le coach concerné
        if (Auth::user()->coach->id !== $availability->coach_id) {
            return response()->json(['error' => 'Accès non autorisé'], 403);
        }

        $availability->delete();

        return response()->json(['success' => true, 'message' => 'Disponibilité supprimée avec succès.','availability'=>$availability]);    }




public function getReservationsByDate($userId)
{
$coach = Coach::where('user_id', $userId)->first();
    if (!$coach) {
        return response()->json(['error' => 'Coach introuvable.'], 404);
    }

    $data = DB::table('reservation')
        ->join('disponibilite', 'reservation.disponibilite_id', '=', 'disponibilite.id')
        ->select(
            DB::raw('DATE(disponibilite.date) as date'),
            DB::raw('COUNT(reservation.id) as total')
        )
        ->where('reservation.coach_id',  $coach->id)
        ->groupBy(DB::raw('DATE(disponibilite.date)'))
        ->orderBy('date', 'asc')
        ->get();

    return response()->json($data);
}



}