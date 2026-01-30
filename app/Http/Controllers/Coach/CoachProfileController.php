<?php

namespace App\Http\Controllers\Coach;
use App\Http\Controllers\Controller;
use App\Models\Disponibilite;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CoachProfileController extends Controller
{

public function profile(Request $request, $id)
    {
        // 1) Coach cliqué (table users, role=coach) + profil coach
        $coachUser = User::where('role', 'coach')
            ->where('id', $id)
            ->with(['coach.availabilities', 'coach.user'])
            ->first();

        if (!$coachUser || !$coachUser->coach) {
            return redirect()->route('home')->with('error', 'Coach not found');
        }
        $coachProfile = $coachUser->coach; // table coachs
        $availabilities = $coachProfile->availabilities ?? collect();

        // 2) Startup du user connecté (table startups)
        $viewer = Auth::user();
        $startup = $viewer->startup ?? null; // adaptez si autre relation
        if (!$startup) {
            return redirect()->back()->with('error', "Aucun profil startup associé à l'utilisateur connecté.");
        }

        // 3) Réservations = CE startup + CE coach (profil)
        $reservationsRaw = Reservation::query()
            ->where('startup_id', $startup->id)      // id de la table startups
            ->where('coach_id',   $coachProfile->id) // id de la table coachs
            ->with(['startup.user', 'coach.user'])
            ->orderByDesc('meeting_time')
            ->get();

        // 4) Adapter les champs pour le composant Vue (mêmes noms que ton SFC)
        $reservations = $reservationsRaw->map(function ($r) {
            $dt = $r->meeting_time ? Carbon::parse($r->meeting_time) : null;
            $start = $dt?->format('H:i');
            $end   = ($dt && $r->duration) ? $dt->copy()->addMinutes((int)$r->duration)->format('H:i') : null;

            return [
                'id'           => $r->id,
                'dateCreation' => optional($r->created_at)->format('d/m/Y'),
                'duree'        => ($r->duration ?? 0) . ' min',
                'dateReunion'  => $dt?->format('d/m/Y'),
                'heure'        => $end ? "$start - $end" : $start,
                'statut'       => $r->statut ?? 'en attente',
                'startup'      => [
                    'id'    => $r->startup?->id,
                    'name'  => $r->startup?->user?->name,
                    'email' => $r->startup?->user?->email,
                ],
                'coach'        => [
                    'id'    => $r->coach?->id,
                    'name'  => $r->coach?->user?->name,
                    'email' => $r->coach?->user?->email,
                ],
            ];
        });

        // 5) Vue Blade (on passe les props en JSON)
        return view('Startup.ProfileCoach', [
            'coach'          => $coachUser,     // User (coach)
            'availabilities' => $availabilities,
            'coachId'        => $coachUser->id, // users.id (utile pour l’entête)
            'myReservations' => $reservations,  // tableau prêt
            'canFilterByStartup' => false,      // on affiche seulement le startup connecté
        ]);
    }

public function List(){
    $coachs = User::where('role', 'coach')
   
    ->with('coach')->get();
    return view('Startup.ListCoach', [
            'coachs' => $coachs
        ]);
 
}

}
