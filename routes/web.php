<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

// 1. ANG SECRET ROUTE (Kinahanglan naa sa ibabaw aron dili ma-apil sa catch-all)
Route::get('/setup-db-secret-2026', function() {
    try {
        // Pag-run sa migrations
        Artisan::call('migrate', ['--force' => true]);
        
        // Pag-run sa seeders
        Artisan::call('db:seed', ['--force' => true]);
        
        return 'SUCCESS! Database Migrated and Seeded Successfully! Pwede na nimo i-delete ang /setup-db-secret-2026 sa URL ug ablihan ang system.';
    } catch (\Exception $e) {
        return 'Naay Error: ' . $e->getMessage();
    }
});

// 2. ANG IMONG ORIGINAL NGA CATCH-ALL ROUTE (Kinahanglan naa sa pinaka-ubos)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');