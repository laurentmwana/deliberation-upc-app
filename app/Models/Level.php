<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Level extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'alias', 'department_id', 'semesters', 'orientation_id'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function semesters(): BelongsToMany
    {
        return $this->belongsToMany(Semester::class);
    }

    public function orientation(): BelongsTo
    {
        return $this->belongsTo(Orientation::class);
    }
}
