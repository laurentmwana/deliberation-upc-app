<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Teacher extends Model
{
    /** @use HasFactory<\Database\Factories\TeacherFactory> */
    use HasFactory;

    protected $fillable = ['name', 'firstname', 'phone', 'gender'];

    public function departments(): BelongsToMany
    {
        return $this->belongsToMany(Department::class);
    }
}
