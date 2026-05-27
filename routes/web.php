<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/setup-db-secret-2026', function() {
    try {
        // Papason ang config apan DILI ang cache aron dili mangita ug database
        Artisan::call('config:clear');

        // I-run diretso ang migrations ug seeders
        Artisan::call('migrate', ['--force' => true]);
        Artisan::call('db:seed', ['--force' => true]);
        
        return 'SUCCESS! Database Migrated and Seeded Successfully! Pwede na nimo ablihan ang system.';
    } catch (\Exception $e) {
        return 'Naay Error Gihapon: ' . $e->getMessage();
    }
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::get('/check-users-2026', function() {
    // Ipakita ang tanang users sa database karon (gitago ang passwords)
    return \App\Models\User::select('id', 'name', 'username', 'email')->get();
});

Route::get('/force-admin-2026', function() {
    try {
        // Pugson nato ug ilis ang password sa unang account aron makasulod ka
        $user = \App\Models\User::first();
        if($user) {
            $user->password = \Illuminate\Support\Facades\Hash::make('password123');
            $user->save();
            return "SUCCESS! Na-reset ang password. I-try ug login gamit ang account ni: " . $user->name . " (Password: password123)";
        }
        return "ERROR: Wala pa gyuy bisan usa ka user sa imong database! Kinahanglan ka mag-register o mag-seed.";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});