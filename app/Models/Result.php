<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Result extends Model
{
    use SoftDeletes;

    protected $fillable = ['student_id', 'file','percent', 'deliberation_id', 'data', 'has_missing_grades', 'decision'];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(related: Level::class);
    }

    public function year(): BelongsTo
    {
        return $this->belongsTo(Year::class);
    }

    public function deliberation(): BelongsTo
    {
        return $this->belongsTo(Deliberation::class);
    }
}
