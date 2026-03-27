<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $category = \App\Models\Category::create([
            'name' => 'Pathophysiology',
            'slug' => 'pathophysiology',
            'description' => 'Comprehensive study of disordered physiological processes.',
        ]);

        \App\Models\Product::create([
            'category_id' => $category->id,
            'name' => 'Pathophysiology Test Bank 2024',
            'description' => 'Over 500+ questions with rationales for Pathophysiology.',
            'price' => 49.99,
            'image_url' => 'https://placehold.co/400x600?text=Pathophysiology+2024',
        ]);

        $exam = \App\Models\Exam::create([
            'category_id' => $category->id,
            'title' => 'Pathophysiology Practice Quiz',
            'description' => 'A sample quiz to test your knowledge of cellular regulation.',
            'time_limit' => 10,
        ]);

        $questions = [
            [
                'question_text' => 'Which of the following is a characteristic of apoptosis?',
                'options' => json_encode(['Cell swelling', 'Inflammatory response', 'Programmed cell death', 'Rupture of plasma membrane']),
                'correct_option' => 2,
                'rationale' => 'Apoptosis is a tidy, programmed process of cell death that does not trigger inflammation.',
            ],
            [
                'question_text' => 'What is the primary cause of edema in a patient with heart failure?',
                'options' => json_encode(['Increased capillary hydrostatic pressure', 'Decreased capillary oncotic pressure', 'Lymphatic obstruction', 'Increased capillary permeability']),
                'correct_option' => 0,
                'rationale' => 'In heart failure, venous congestion increases hydrostatic pressure, forcing fluid into the tissues.',
            ],
            [
                'question_text' => 'Which electrolyte imbalance is most commonly associated with T-wave peaking on an ECG?',
                'options' => json_encode(['Hyponatremia', 'Hypocalcemia', 'Hyperkalemia', 'Hypokalemia']),
                'correct_option' => 2,
                'rationale' => 'High potassium levels (hyperkalemia) lead to tall, peaked T-waves.',
            ],
        ];

        foreach ($questions as $q) {
            $exam->questions()->create($q);
        }
    }
}
