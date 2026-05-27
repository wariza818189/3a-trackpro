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