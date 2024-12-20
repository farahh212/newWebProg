<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Allow all domains or specify a specific one
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*') // Allow all origins or replace '*' with your domain
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Allowed methods
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization, X-Custom-Header'); // Allowed headers
    }
}