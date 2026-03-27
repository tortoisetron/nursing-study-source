<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Exam;

class UserAttempt extends Model
{
    /** @use HasFactory<\Database\Factories\UserAttemptFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'exam_id', 'score', 'total_questions', 'time_taken', 'completed_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
