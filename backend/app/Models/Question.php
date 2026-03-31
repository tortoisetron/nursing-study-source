<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToOrganization;

class Question extends Model
{
    use BelongsToOrganization;

    protected $fillable = ['organization_id', 'exam_id', 'content', 'options', 'correct_answer', 'rationale'];

    protected $casts = [
        'options' => 'array',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
