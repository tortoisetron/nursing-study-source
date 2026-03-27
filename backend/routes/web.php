<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categories' => \App\Models\Category::all(),
        'products' => \App\Models\Product::with('category')->take(6)->get(),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test-bank', function (\Illuminate\Http\Request $request) {
    return Inertia::render('TestBank', [
        'categories' => \App\Models\Category::all(),
        'products' => \App\Models\Product::with('category')->get(),
        'initialCategory' => $request->query('category'),
    ]);
})->name('test-bank');

Route::get('/test-bank/{product:slug}', function (\App\Models\Product $product) {
    return Inertia::render('ProductDetails', [
        'product' => $product->load('category'),
        'exams' => \App\Models\Exam::where('category_id', $product->category_id)->get(),
    ]);
})->name('product.show');

Route::get('/exams/{exam}', function (\App\Models\Exam $exam) {
    return Inertia::render('ExamInterface', [
        'exam' => $exam,
        'questions' => $exam->questions,
    ]);
})->name('exam.show');

Route::post('/exams/{exam}/submit', function (\App\Models\Exam $exam, \Illuminate\Http\Request $request) {
    // In a real app, calculate score and save attempt
    $results = [
        'exam' => $exam,
        'score' => 85, // Dummy score
        'answers' => $request->answers,
    ];
    return Inertia::render('Results', $results);
})->name('exam.submit');

require __DIR__.'/auth.php';
