<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\BelongsToOrganization;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, BelongsToOrganization;

    protected $fillable = ['organization_id', 'category_id', 'name', 'description', 'price', 'tag', 'image_url', 'file_path'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
