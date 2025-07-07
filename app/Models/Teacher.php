<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    /** @use HasFactory<\Database\Factories\TeacherFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = ['name', 'firstname', 'phone', 'gender'];

    public function departments(): BelongsToMany
    {
        return $this->belongsToMany(Department::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
