<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\UserAttempt;
use Illuminate\Support\Facades\Auth;

class UserAttemptController extends Controller
{
    public function index()
    {
        return response()->json(Auth::user()->attempts()->with('exam')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'score' => 'required|integer',
            'total_questions' => 'required|integer',
            'time_taken' => 'required|integer',
        ]);

        $attempt = Auth::user()->attempts()->create($validated + [
            'completed_at' => now(),
        ]);

        return response()->json($attempt, 201);
    }
}
