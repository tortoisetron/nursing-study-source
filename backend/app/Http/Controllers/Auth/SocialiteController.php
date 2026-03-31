<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class SocialiteController extends Controller
{
    public function redirect(\Illuminate\Http\Request $request)
    {
        $role = $request->query('role', 'individual');
        session(['socialite_role' => $role]);

        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            $role = session('socialite_role', 'individual');

            // Check if user exists by email, otherwise create account with correct role
            $user = User::firstOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'password' => bcrypt(Str::random(16)),
                    'role' => $role,
                ]
            );

            // Ensure the role is updated even if user existed but was created differently before
            // Or just leave it if it's firstOrCreate?
            // Actually firstOrCreate only creates if not found. If user existed, we won't change role.
            // But if user was an organization and they logged in with individual selection... 
            // Better to keep role as is if already existing? Or update it?
            // Usually, first login defines the role.

            Auth::login($user);

            \Log::info('Google Auth Success', ['user_id' => $user->id, 'email' => $user->email, 'role' => $role]);

            $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
            
            // Redirect based on role if needed
            if ($user->role === 'organization') {
                return redirect('http://localhost:5174'); // CRM usually on 5174 based on earlier context
            }
            
            return redirect($frontendUrl . '/dashboard');
        } catch (\Exception $e) {
            \Log::error('Google Auth Failed', [
                'role' => session('socialite_role'),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
            return redirect($frontendUrl . '/login?error=google_auth_failed');
        }
    }
}
