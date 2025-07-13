<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'firstname', 'birth', 'gender', 'registration_token', 'user_id'];

    public function actualLevel(): HasOne
    {
        return $this->hasOne(ActualLevel::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function historicLevels(): HasMany
    {
        return $this->hasMany(HistoricLevel::class);
    }

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }
}
