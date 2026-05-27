<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS when running in production behind Render's reverse proxy.
        // Render terminates SSL at the load balancer, so Laravel sees plain HTTP
        // internally and would generate http:// asset URLs without this.
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
