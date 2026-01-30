<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;

class CompteController extends Controller
{

        public function startup()
        {

            return view('Admin.ListStartup', [
                'startupes' =>User::where('role', 'startup')->get()
            ]);

        }

        public function investisseur()
        {

            return view('Admin.ListInvestisseur', [
                'investisseurs' => User::where('role', 'investisseur')->get()
            ]);

        }
    public function index()
{
    return view('Admin.ListCoach', [
        'coaches' => User::where('role', 'coach')->get()
    ]);
}
public function dashboard()
    {
        $users = User::latest()->take(3)->get();
        $reservations = Reservation::all();
        return view('Admin.DashboardAdmin', [
            'users' => $users,
            'reservations' => $reservations,
        ]);

    }
public function editProfileAdmin(Request $request, $id)
{
    $authUser = $request->user(); // l'utilisateur connecté

    // On récupère l'utilisateur visé par l'ID et on vérifie qu'il est bien admin
    $userInfo = User::with('admin')->where('id', $id)->where('role', 'admin')->firstOrFail();

    return view('profile.profileAdmin', [
        'mustVerifyEmail' => $authUser instanceof MustVerifyEmail,
        'status' => session('status'),
        'userInfo' => $userInfo, // profil à afficher
        'role' => $userInfo->role, // rôle de l'utilisateur affiché
    ]);
}

}
