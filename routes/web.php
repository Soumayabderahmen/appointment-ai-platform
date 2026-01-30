<?php

use App\Http\Controllers\Admin\CompteController;
use App\Http\Controllers\Admin\AgentController;
use App\Http\Controllers\Admin\CategorieController;
use App\Http\Controllers\AgentIA\AgentIAController;
use App\Http\Controllers\Api\Admin\InvestisseurController;
use App\Http\Controllers\Api\Chat\ChatController;
use App\Http\Controllers\Coach\CoachProfileController;
use App\Http\Controllers\Investisseurs\ListInvestisseurController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Startups\ListStartupController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Coach\AvailabilityController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Startups\PaiementController;
use App\Http\Controllers\Startups\ReservationController;
use App\Models\Reservation;

Route::get('health', function () {
   return response()->json(['status'=>'ok']);
});

Route::get('/', function () {
    // Si l'utilisateur est authentifié, le rediriger vers le tableau de bord ou une autre page
    if (Auth::check()) {
        return redirect()->route('dashboard'); // Assure-toi de créer la route 'dashboard' si nécessaire
    }

    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
    return redirect()->route('coach');
});

Route::get('/dashboard', function () {
    return view('Coach.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::get('/activation-message', function () {
    return Inertia::render('Coach/ActivationMessage');
})->name('activation.message');
// Route::middleware('auth')->get('/notifications', function () {
//     return Auth::user()->notifications()->latest()->get();
// });

Route::middleware('auth')->patch('/notifications/{id}', function ($id) {
    Auth::user()->notifications()->findOrFail($id)->markAsRead();
    return response()->noContent();
});
Route::middleware('auth')->get('/notifications', function () {
    $user = Auth::user();

    // Vérifie si l'utilisateur est bien un coach
    if (!$user->coach) {
        return response()->json([], 403);
    }

    // Récupérer les réservations liées à ce coach avec statut "en attente"
    $reservations = Reservation::where('coach_id', $user->coach->id)
        ->where('statut', 'en attente')
        ->with('startup.user') // permet d'afficher le nom de la startup
        ->latest()
        ->get();

    return response()->json($reservations);
});
// Route::post('/reservations/{reservation}/response', [ReservationController::class, 'respond']);
Route::get('/mentions', [HomeController::class, 'mentions'])->name('mentions');
Route::get('/contacter', [HomeController::class, 'contact'])->name('contacter');
    // Route::get('/notifications', [ReservationController::class, 'index'])->name('notifications.index');

Route::prefix('admin')->middleware(['auth', 'verified'])->name('admin.')->group(function () {
Route::get('/coaches', [CompteController::class, 'index'])->name('coaches');
Route::get('/dashboard', [CompteController::class, 'dashboard'])->name('dashboard');
Route::get('/startups', [CompteController::class, 'startup'])->name('startups');
Route::get('/investisseurs', [CompteController::class, 'investisseur'])->name('investisseurs');
Route::get('/reservations', [ReservationController::class, 'indexAdmin'])->name('reservations');
route::get('/detailsAgent/{id}', [AgentController::class, 'show'])->name('detailsAgent');
 route::get('/listAgent', [AgentController::class, 'index'])->name('listAgent');
 route::get('/profileAdmin/{id}', [CompteController::class, 'editProfileAdmin'])->name('profileAdmin');
route::get('/categorie',[CategorieController::class, 'index'])->name('categorie.index');
route::get('/categorie/create',[CategorieController::class, 'create'])->name('categorie.create');
    Route::get('categorie/{categorie}/edit', [CategorieController::class, 'edit'])->name('categorie.edit'); 
    Route::get('/addInvestisseurs',[InvestisseurController::class, 'create'])->name('add.investisseurs');
    Route::get('/list/Publication',[InvestisseurController::class,'index'])->name('list.publication');

});


Route::prefix('startup')->middleware(['auth', 'verified'])->name('startup.')->group(function () {
    Route::get('/dashboard', [ListStartupController::class, 'ListMembres'])->name('list');
    Route::get('/calendar', [ListStartupController::class, 'FullCalandryStartup'])->name('calendar');
    Route::get('/res/create', [ReservationController::class, 'create'])->name('reservation.create');
    Route::get('/reservation/message', function () {return view('reservations.MessageReservation');})->name('reservation.message');
    Route::get('/reservations', [ReservationController::class, 'indexStartup'])->name('reservations');
    Route::get('/paiement/success', [PaiementController::class, 'success'])->name('paiement.success');
    Route::get('/paiement/cancel', [PaiementController::class, 'cancel'])->name('paiement.cancel');
    Route::get('/paiement/{reservation}', [PaiementController::class, 'show'])->name('paiement.show');


});
Route::prefix('coach')->middleware(['auth', 'verified'])->name('coach.')->group(function () {
    Route::get('/availability', [AvailabilityController::class, 'index'])->name('availability.index');
    Route::get('/reservations', [ReservationController::class, 'indexCoach'])->name('reservations');

});
Route::get('/chat/{id}', [ChatController::class, 'chatMessage'])->name('chat.message');

Route::prefix('agentia')->middleware(['auth'])->group(function () {
    Route::get('/', [AgentIAController::class, 'agentia'])->name('coach.agentia');
    Route::get('/details/{agent}', [AgentIAController::class, 'detailsAgentia'])->name('coach.agentia.details');
    Route::get('/add', [AgentIAController::class, 'addAgentia'])->name('coach.agentia.add');
    // routes/web.php


});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/ListStartups', [ListStartupController::class, 'List'])->name('list.startup');
    Route::get('/profile/Coach/{id}', [CoachProfileController::class, 'profile'])->name('profile.coach');
    Route::get('/ListInvestisseurs', [ListInvestisseurController::class, 'List'])->name('list.investisseurs');
    Route::get('/ListCoachs', [CoachProfileController::class, 'List'])->name('list.coach');
    Route::get('/profile/Investisseur/{id}', [ListInvestisseurController::class, 'profile'])->name('profile.investisseur');
    Route::get('/profile/startup/{id}', [ListStartupController::class, 'profile'])->name('profile.startup');


    Route::get('/paiement/{reservation}', [PaiementController::class, 'show'])->name('paiement.show');

    Route::post('/paiement/create-intent', [PaiementController::class, 'createStripeIntent'])->name('paiement.intent');

    Route::get('/calendar', [AvailabilityController::class, 'FullCalandry'])->name('coach.calendar');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.complete'); // Sauvegarder les modifications

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::prefix('home')->group(function () {
    Route::get('/voir/{id}/details', [HomeController::class, 'show'])->name('agentia.details');
    Route::get('/investisseur',[HomeController::class, 'investisseurs'])->name('home.investisseurs');
});
Route::get('/', [HomeController::class, 'coach'])->name('coach');
Route::get('/ListAgent', [HomeController::class, 'agentia'])->name('agentIa');

// Paiement d’un agent IA


require __DIR__.'/auth.php';
