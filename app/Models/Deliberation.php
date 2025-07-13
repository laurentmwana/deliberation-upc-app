<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Deliberation extends Model
{
    use SoftDeletes;

    protected $fillable = ['level_id', 'year_id', 'semester_id', 'description', 'completed_at'];

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    public function year(): BelongsTo
    {
        return $this->belongsTo(Year::class);
    }

    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }
}
