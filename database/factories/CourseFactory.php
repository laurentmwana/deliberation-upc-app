<?php

namespace Database\Factories;

use App\Enums\SemesterEnum;
use App\Models\Level;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'alias' => fake()->unique()->name(),
            'credits' => random_int(5, 20),
            'level_id' => Level::all()->random()->id,
            'teacher_id' => Teacher::all()->random()->id
        ];
    }
}
