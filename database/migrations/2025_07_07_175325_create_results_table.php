<?php

use App\Enums\PeriodEnum;
use App\Enums\SemesterEnum;
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
       Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->json('data');
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('file');
            $table->double('percent')->nullable();
            $table->string('decision');
            $table->boolean('has_missing_grades')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
