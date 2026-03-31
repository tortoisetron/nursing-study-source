<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToOrganization;

class Exam extends Model
{
    use BelongsToOrganization;

    protected $fillable = ['organization_id', 'category_id', 'title', 'description', 'time_limit'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
