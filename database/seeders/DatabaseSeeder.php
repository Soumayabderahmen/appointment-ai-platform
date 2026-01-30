<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
        // Create a user
        $user = User::factory()->create([
            
            'name' => 'Soumaya Abderahmen',
            'email' => 'soumayaabderahmen44@gmail.com',
            'password' => bcrypt('AO09!lve'),
            'role'=>'admin'
        ]);
        Admin::create([
            'user_id' => $user->id,
            
        ]);
        // Attach role to user
      //  $user->roles()->attach($adminRole->id);
    }
}