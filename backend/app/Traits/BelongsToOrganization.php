<?php

namespace App\Traits;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

trait BelongsToOrganization
{
    protected static function bootBelongsToOrganization()
    {
        static::creating(function ($model) {
            if (!$model->organization_id && Auth::check()) {
                $model->organization_id = Auth::user()->organization_id;
            }
        });

        static::addGlobalScope('organization', function (Builder $builder) {
            if (Auth::check()) {
                $user = Auth::user();
                if ($user->role === 'organization' && $user->organization_id) {
                    // Organization admin sees ONLY their organization's stuff
                    $builder->where('organization_id', $user->organization_id);
                } elseif ($user->role === 'student' && $user->organization_id) {
                    // Student sees ONLY their organization's stuff
                    $builder->where('organization_id', $user->organization_id);
                } elseif ($user->role === 'admin') {
                    // Super Admin sees EVERYTHING (no scope)
                } else {
                    // Guests or students/individuals without an org see only Public stuff
                    $builder->whereNull('organization_id');
                }
            } else {
                // Guests see only Public stuff
                $builder->whereNull('organization_id');
            }
        });
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
