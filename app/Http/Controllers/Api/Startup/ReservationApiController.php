<?php

namespace App\Http\Controllers\Api\Startup;


use App\Http\Controllers\Controller;
use App\Mail\StatutUpdatedMail;
use App\Models\Disponibilite;
use App\Models\Reservation;
use App\Models\Startup;
use App\Notifications\ReservationRequestNotification;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use GuzzleHttp\Exception\RequestException;

class ReservationApiController extends Controller
{
public function store(Request $request)
{
    $validated = $request->validate([
        'availability_id' => 'required|exists:disponibilite,id',
        'selected_time'   => 'required|date_format:H:i',
        'duration'        => 'required|integer|min:15',
        'honoraire'       => 'required|numeric|min:0',
        'total'           => 'required|numeric|min:0',
        'message'         => 'nullable|string',
    ]);

    // Vérification startup
    $startup = Startup::findOrFail($request->startup_id);
    if (Auth::id() !== $startup->user_id) {
        return back()->withErrors(['error' => 'Accès non autorisé.']);
    }

    // Vérification disponibilité
    $availability = Disponibilite::findOrFail($validated['availability_id']);

    // Création de la réservation
    $reservation = Reservation::create([
        'coach_id'        => $availability->coach_id,
        'startup_id'      => $startup->id,
        'meeting_time'    => $validated['selected_time'],
        'duration'        => $validated['duration'],
        'total'           => $validated['total'],
        'message'         => $validated['message'] ?? '',
        'statut'          => 'en attente',
        'disponibilite_id'=> $availability->id,
    ]);

    // 🔎 Trouver le User du coach à partir du coach_id
    $coach = $reservation->coach;
    if ($coach && $coach->user) {
        $coach->user->notify(new ReservationRequestNotification($reservation));
    } else {
        Log::warning("Impossible d’envoyer une notif : Coach sans user", [
            'coach_id' => $reservation->coach_id
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'Réservation enregistrée avec succès.',
        'redirect' => route('startup.reservation.message'),
    ]);
}



    public function respond(Request $request, Reservation $reservation)
    {
        $status = $request->input('statut');
        $reservation->statut = $status;

        if ($status === 'acceptée') {
            try {
                $apiKey = config('services.whereby.key');
                if (!$apiKey) throw new \Exception('Clé API Whereby manquante');

                $client = new Client([
                    'base_uri' => 'https://api.whereby.dev/v1/',
                    'headers' => [
                        'Authorization' => 'Bearer ' . $apiKey,
                        'Content-Type' => 'application/json',
                    ],
                ]);

                $startDate = now()->addMinute();
                $endDate = (clone $startDate)->addMinutes($reservation->duration ?? 30);

                $payload = [
                    'startDate' => $startDate->toIso8601String(),
                    'endDate' => $endDate->toIso8601String(),
                    'fields' => ['hostRoomUrl'],
                ];

                $response = $client->post('meetings', ['json' => $payload]);
                $data = json_decode($response->getBody(), true);

                if (!empty($data['roomUrl'])) {
                    $reservation->meeting_url = $data['roomUrl'];
                } else {
                    Log::warning('[Whereby] Lien manquant : ' . json_encode($data));
                }

            } catch (RequestException $e) {
                Log::error('[Whereby Guzzle Error]', ['message' => $e->getMessage()]);
                return response()->json(['error' => 'Erreur Whereby'], 500);
            } catch (\Exception $e) {
                Log::error('[Whereby Exception]', ['message' => $e->getMessage()]);
                return response()->json(['error' => 'Erreur Whereby'], 500);
            }
        }

        $reservation->save();

        if ($reservation->startup->user?->email) {
            Mail::to($reservation->startup->user->email)
                ->send(new StatutUpdatedMail($reservation));
        }

        return response()->json(['success' => true]);
    }

     public function destroy(Reservation $reservation)
    {
        $user = Auth::user();

        // 🔐 Autorisations minimales : le startup propriétaire OU le coach concerné OU un admin
        $isOwnerStartup = optional($user->startup)->id === $reservation->startup_id;

        // ⚠️ Si reservation.coach_id pointe vers users.id, ceci suffit.
        // Si ça pointe vers la table "coachs", adapte à: optional($user->coach)->id === $reservation->coach_id
        $isOwnerCoach   = ($user->role === 'coach' && $user->id === $reservation->coach_id);

        if (!($isOwnerStartup || $isOwnerCoach || $user->role === 'admin')) {
            abort(403, 'Non autorisé');
        }

        $reservation->delete();

        return response()->json(['ok' => true]);
    }
}
