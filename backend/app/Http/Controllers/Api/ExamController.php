<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Exam;

class ExamController extends Controller
{
    public function index()
    {
        return response()->json(Exam::with('category')->get());
    }

    public function show(Exam $exam)
    {
        return response()->json($exam->load(['category', 'questions']));
    }
}
