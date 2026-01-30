<?php

namespace App\Http\Controllers\Api\Startup;

use App\Http\Controllers\Controller;
use App\Models\Paiement;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class PaiementApiController extends Controller
{
    public function checkout(Request $request, Reservation $reservation)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $validated = $request->validate([
            'pays' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
            'code_postal' => 'required|string|max:20',
        ]);

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => 'Réservation coach',
                    ],
                    'unit_amount' => $reservation->total * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('startup.paiement.success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('startup.paiement.cancel'),
        ]);

        Paiement::create([
            'user_id' => Auth::id(),
            'reservation_id' => $reservation->id,
            'pays' => $validated['pays'],
            'ville' => $validated['ville'],
            'adresse' => $validated['adresse'],
            'code_postal' => $validated['code_postal'],
            'total' => $reservation->total,
            'currency' => 'eur',
            'stripe_session_id' => $session->id,
            'status' => 'en_attente',
        ]);

        return redirect($session->url);
    }
}
