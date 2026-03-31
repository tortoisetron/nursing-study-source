<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToOrganization;

class Category extends Model
{
    use BelongsToOrganization;

    protected $fillable = ['organization_id', 'name', 'slug', 'description'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}
