<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        $accountType = $request->input('accountType', 'individual');

        if ($accountType === 'organization') {
            $request->validate([
                'org_name' => 'required|string|max:255',
                'org_email' => 'required|string|email|max:255|unique:organizations,email',
                'admin_name' => 'required|string|max:255',
                'admin_email' => 'required|string|lowercase|email|max:255|unique:'.User::class.',email',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'name' => $request->admin_name,
                'email' => $request->admin_email,
                'password' => Hash::make($request->password),
                'role' => 'organization',
                'phone' => $request->admin_phone ?? null,
            ]);

            $org = Organization::create([
                'name' => $request->org_name,
                'email' => $request->org_email,
                'phone' => $request->org_phone ?? null,
                'address' => $request->org_address ?? null,
                'admin_id' => $user->id,
            ]);

            $user->update(['organization_id' => $org->id]);
        } else {
            // Individual or Student
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'organization_id' => $accountType === 'student' ? 'required|exists:organizations,id' : 'nullable',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $accountType,
                'phone' => $request->phone ?? null,
                'organization_id' => $accountType === 'student' ? $request->organization_id : null,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        if ($request->wantsJson()) {
            return response()->json(['user' => $user]);
        }

        return redirect(route('dashboard', absolute: false));
    }
}
