<?php

namespace App\Http\Controllers\Startups;

use GuzzleHttp\Exception\RequestException;
use A4Anthony\WherebyLaravel\Facades\WherebyLaravel;
use GuzzleHttp\Client;

use App\Http\Controllers\Controller;
use App\Mail\StatutUpdatedMail;
use App\Models\Coach;
use App\Models\Disponibilite;
use App\Models\Reservation;
use App\Models\Startup;
use App\Models\User;
use App\Notifications\ReservationRequestNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    public function indexAdmin()
    {
        $reservations = Reservation::with(['startup.user', 'coach.user'])->get();
        return view('reservations.index', [
            'reservations' => $reservations,
        ]);
    }

    public function indexStartup()
    {
        $startup = Auth::user()->startup;

        $reservations = Reservation::where('startup_id', $startup->id)
            ->with(['startup.user', 'coach.user'])
            ->get();
        return view('reservations.ReservationStartup', [
            'reservations' => $reservations,
        ]);
    }
    public function indexCoach()
    {
        $coach = Auth::user()->coach;

        $reservations = Reservation::where('coach_id', $coach->id)
            ->with(['startup.user', 'coach.user'])
            ->get();
        return view('reservations.ReservationCoach', [
            'reservations' => $reservations,
        ]);
    }

    public function create(Request $request)
    {
        $coachId = $request->query('coach_id');
        $availabilityId = $request->query('availability_id');

        $coach = Coach::with('user')->findOrFail($coachId);
        $availability = Disponibilite::findOrFail($availabilityId);
        $honoraire = $availability->honoraire;
        // Génération des créneaux (slots)
        $start = Carbon::createFromFormat('H:i:s', $availability->start_time);
        $end = Carbon::createFromFormat('H:i:s', $availability->end_time);

        $slots = [];

        while ($start < $end) {
            $slots[] = $start->format('H:i');
            $start->addMinutes(30); // Durée de chaque slot
        }

        return view('reservations.AddReservation', [
            'coach' => $coach,
            'availability' => $availability,
            'slots' => $slots,
            'date' => $availability->date,
            'honoraire' => $honoraire,
            'startup_id' => Auth::user()->startup->id,
        ]);
    }

    public function notifications()
    {
        return view('coach.notification.index');
    }
 
}
