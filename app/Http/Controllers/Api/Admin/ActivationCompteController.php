<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Mail\CoachActivated;
use App\Mail\InvestisseurActivated;
use App\Mail\StartupActivated;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\Storage;
class ActivationCompteController extends Controller
{
    public function activateCoach($id)
    {
        try {
            $coach = User::where('id', $id)->where('role', 'coach')->firstOrFail();

            // Activer le coach
            $coach->statut = 'active';
            $coach->save();

            // Vérifier si l'email existe et envoyer l'email
            if ($coach->email) {
                $this->sendEmailCoach($coach);
            } else {
                Log::error("Aucun email trouvé pour le coach ID {$coach->id}");
            }

            return response()->json (['success' => true, 'message' => 'Le coach a été activé avec succès.'], 200);


        } catch (\Exception $e) {
            Log::error("Erreur lors de l'activation du coach : " . $e->getMessage());
            return response()->json  (['success' => false, 'message' => "Une erreur est survenue lors de l'activation du coach."], 400);
        }
    }

    private function sendEmailCoach($coach)
    {
        try {
            Mail::to($coach->email)->send(new CoachActivated($coach));
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'envoi de l'email : " . $e->getMessage());
            throw new \Exception('Erreur lors de l\'envoi de l\'email.');
        }
    }


    public function activateStartup($id)
    {
        try {
            $startup = User::where('id', $id)->where('role', 'startup')->firstOrFail();

            // Activer le startup
            $startup->statut = 'active';
            $startup->save();

            // Envoyer l'email
            if ($startup->email) {
                $this->sendEmail($startup);
            } else {
                Log::error("Aucun email trouvé pour la startup ID {$startup->id}");

            }
            return response()->json(['success' => true, 'message' => 'Le compte de la startup a été activé avec succès.'], 200);
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'activation de la startup : " . $e->getMessage());
        }
        return response()->json(['success' => false, 'message' => "Une erreur est survenue lors de l'activation de la startup."], 400);

    }

    private function sendEmail($startup)
    {
        try {
            Mail::to($startup->email)->send(new StartupActivated($startup));
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'envoi de l'email : " . $e->getMessage());
            // Vous pouvez aussi retourner une réponse d'erreur ici si vous souhaitez
            throw new \Exception('Erreur lors de l\'envoi de l\'email.');
        }
    }


        public function activateInvestisseur($id)
        {
            try {
                $investisseur = User::where('id', $id)->where('role', 'investisseur')->firstOrFail();


                $investisseur->statut = 'active';
                $investisseur->save();


                if ($investisseur->email) {
                    $this->sendEmailInvestisseur($investisseur);
                } else {
                    Log::error("Aucun email trouvé pour l'investisseur ID {$investisseur->id}");
                    return response()->json(['error' => "Aucun email trouvé pour cet investisseur."], 400);  // Code HTTP 400 pour erreur
                }

                return  response()->json(['success' => true, 'message' => 'L\'investisseur a été activé avec succès.'], 200);

            } catch (\Exception $e) {
                Log::error("Erreur lors de l'activation de l'investisseur : " . $e->getMessage());
                return response()->json(['success' => false, 'message' => "Une erreur est survenue lors de l'activation de l'investisseur."], 400);
            }}

        private function sendEmailInvestisseur($investisseur)
        {
            try {
                Mail::to($investisseur->email)->send(new InvestisseurActivated($investisseur));
            } catch (\Exception $e) {
                Log::error("Erreur lors de l'envoi de l'email : " . $e->getMessage());
                throw new \Exception('Erreur lors de l\'envoi de l\'email.');
            }
        }


public function update(Request $request,$id)
{
    $authUser = $request->user(); // l'utilisateur connecté

    // On récupère l'utilisateur visé par l'ID et on vérifie qu'il est bien admin
    $user = User::with('admin')->where('id', $id)->where('role', 'admin')->firstOrFail();


    // 🔒 Validation des champs
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'phone_number' => 'nullable|string|max:20',
        'adresse' => 'nullable|string|max:255',
        'profile_image' => 'nullable|image|max:10240',         // image de profil
        'cover_image' => 'nullable|image|max:10240',   // image de couverture
    ]);

    // 🔁 Mise à jour des infos dans users
    $user->name = $validated['name'];
    $user->email = $validated['email'];
    $user->phone_number = $validated['phone_number'] ?? $user->phone_number;

    // 📸 Upload image de profil
    

    $user->save();

    // 🔁 Mettre à jour ou créer les infos dans admins
    $admin = $user->admin()->firstOrNew(['user_id' => $user->id]);
    $admin->adresse = $validated['adresse'] ?? $admin->adresse;

    if ($request->hasFile('profile_image')) {
        // Supprimer l'ancienne image si elle existe
        if ($admin->profile_image && Storage::disk('public')->exists($admin->profile_image)) {
            Storage::disk('public')->delete($admin->profile_image);
        }

        // Stocker la nouvelle image dans le champ profile_image
        $admin->profile_image = $request->file('profile_image')->store('admins/profile_images', 'public');
    }

    // 🌄 Upload image de couverture
    if ($request->hasFile('cover_image')) {
        // Supprimer l'ancienne image si elle existe
        if ($admin->cover_image && Storage::disk('public')->exists($admin->cover_image)) {
            Storage::disk('public')->delete($admin->cover_image);
        }

        $admin->cover_image = $request->file('cover_image')->store('admins/covers', 'public');
    }

    $admin->save();

    return response()->json([
        'message' => 'Profil mis à jour avec succès',
        'user' => $user->load('admin'),
    ]);
}


}
