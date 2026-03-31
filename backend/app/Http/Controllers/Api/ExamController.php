<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Exam;

class ExamController extends Controller
{
    public function index()
    {
        return response()->json(Exam::withoutGlobalScopes()->with('category')->get());
    }

    public function show($id)
    {
        $exam = Exam::withoutGlobalScopes()
            ->with(['category' => fn($q) => $q->withoutGlobalScopes(), 'questions'])
            ->findOrFail($id);
            
        return response()->json($exam);
    }
}
