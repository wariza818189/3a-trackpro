<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/setup-db-secret-2026', function() {
    try {
        // 1. Papason ang karaan nga cache aron mapugos siya ug basa sa Render settings
        Artisan::call('config:clear');
        Artisan::call('cache:clear');

        // 2. Susiha kung nabasa ba niya ang DATABASE_URL nga imong gibutang sa Render
        if (empty(env('DATABASE_URL'))) {
            return 'KASAYPANAN (ERROR): Wala nakita sa system ang imong DATABASE_URL! Palihug balik sa Render Dashboard > Environment, ug siguroha nga sakto ang pagka-paste nimo sa DATABASE_URL didto.';
        }

        // 3. Kung okay na tanan, i-run ang migrations ug seeders
        Artisan::call('migrate', ['--force' => true]);
        Artisan::call('db:seed', ['--force' => true]);
        
        return 'SUCCESS! Database Migrated and Seeded Successfully! Pwede na nimo ablihan ang system.';
    } catch (\Exception $e) {
        return 'Naay Error: ' . $e->getMessage();
    }
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');