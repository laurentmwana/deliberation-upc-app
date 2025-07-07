<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    /** @use HasFactory<\Database\Factories\DepartmentFactory> */
    use HasFactory;

    protected $fillable = ['name', 'alias', 'faculty_id'];

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    public function levels(): HasMany
    {
        return $this->hasMany(Level::class);
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class);
    }
}
