<?php

namespace App\Http\Controllers\Startups;

use App\Http\Controllers\Controller;
use App\Models\Paiement;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationPaidMail;

class PaiementController extends Controller
{
    public function show(Reservation $reservation)
    {
        return view('paiement.show', compact('reservation'));
    }

  

public function success(Request $request)
{
    Stripe::setApiKey(config('services.stripe.secret'));

    $session_id = $request->get('session_id');

    if (!$session_id) {
        abort(400, 'Session ID manquant');
    }

    // ✅ Récupère le paiement lié à la session Stripe
    $paiement = Paiement::where('stripe_session_id', $session_id)->firstOrFail();

    // ✅ Récupère la réservation associée et marque comme "payée"
    $reservation = $paiement->reservation;
    $reservation->paid = true;
    $reservation->save();

    // ✅ Marque le paiement comme payé
    $paiement->status = 'payé';
    $paiement->save();

    // ✅ Envoi du mail au coach avec lien Whereby
    $coach = $reservation->coach->user ?? null;

    if ($coach && $coach->email) {
        Mail::to($coach->email)->send(new \App\Mail\ReservationPaidMail($reservation));
    }

    // ✅ Affiche la vue de confirmation à la startup
    return view('paiement.success', compact('reservation'));
}


    public function cancel()
    {
        return view('paiement.cancel');
    }
}
