<?php

namespace App\Models;

use App\Enums\SemesterEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Semester extends Model
{
    protected $fillable = ['name'];

        /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'name' => SemesterEnum::class
        ];
    }


    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class);
    }
}
