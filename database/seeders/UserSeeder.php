<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Delete existing users first (clean slate)
        User::truncate();

        // Admin account
        User::create([
            'name'     => '3A Admin',
            'username' => 'admin',
            'email'    => 'admin@3atrackpro.com',
            'password' => Hash::make('Admin@2026!'),
            'role'     => 'admin',
        ]);

        // Staff account
        User::create([
            'name'     => '3A Staff',
            'username' => 'staff',
            'email'    => 'staff@3atrackpro.com',
            'password' => Hash::make('Staff@2026!'),
            'role'     => 'staff',
        ]);
    }
}
