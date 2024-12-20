<?php

namespace App\Http\Controllers;

use App\Models\Userr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find the user by username
        $user = Userr::where('username', $request->username)->first();

        // Check if the user exists and the password is correct
        if ($user && Hash::check($request->password, $user->password)) {
            
            // Create a new token for the user using Sanctum
            $token = $user->createToken('MyApp')->plainTextToken;

            // Set a cookie with the username
            $cookie = Cookie::make('username', $user->username, 60); // cookie valid for 60 minutes

            return response()->json([
                'message' => 'Login successful',
                'token' => $token
            ])->cookie($cookie);  // Attach the cookie with the response
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
