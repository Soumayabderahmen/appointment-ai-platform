<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\Controller;
use App\Models\Coach;
use App\Models\Disponibilite;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class AvailabilityController extends Controller


{

    public function index()
    {
        $coach = Auth::user()->coach;

        $availabilities = Disponibilite::where('coach_id', $coach->id)
        ->orderBy('created_at', 'desc') // dernier en premier
        ->get();
    
        return view('Disponibilite.index', [
            'availabilities' => $availabilities,
            'coachId' => $coach->id, 
        ]);
    }
    

    
 
    



// Ajoutez ces méthodes dans votre contrôleur

   



    /**
     * Supprimer une disponibilité
     */
   

    public function FullCalandry()
{
    
    $availabilities = Auth::user()->coach->availabilities()
        ->select('id', 'date', 'start_time', 'end_time', 'statut' , "nb_place", "honoraire",'titre')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'date' => $item->date,
                'start_time' => $item->start_time,
                'end_time' => $item->end_time,
                'statut' => $item->statut,
                'nb_place' => $item->nb_place,
                'honoraire' => $item->honoraire,
                'title' => $item->titre,

            ];
        });

    return view('Coach.Calender', [
        'availabilities' => $availabilities,
        'coachId' => Auth::user()->coach->id
    ]);
}

public function calendarEvents(Request $request)
{
    $events = Auth::user()->coach->availabilities()
->select('id', 'date', 'start_time', 'end_time', 'statut', 'titre')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
               
                'title' => $item->titre . ' (' . ucfirst($item->statut) . ')',

                'start' => $item->date . 'T' . $item->start_time,
                'end' => $item->date . 'T' . $item->end_time,
                'color' => $item->statut === 'available' ? '#28a745' : '#dc3545',
                'statut' => $item->statut,
               
            ];
        });

    return response()->json($events);
}


}
