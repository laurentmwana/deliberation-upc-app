<?php

use App\Enums\GenderEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('firstname');
            $table->string('phone')->unique();
            $table->enum('gender', GenderEnum::values());
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('department_teacher', function (Blueprint $table) {
            $table->foreignId('department_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnDelete();
            $table->foreignId('teacher_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnDelete();
            $table->primary(['department_id', 'teacher_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
