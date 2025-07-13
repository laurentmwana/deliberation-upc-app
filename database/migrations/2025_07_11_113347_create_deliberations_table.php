<?php

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
        Schema::create('deliberations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('level_id')
                    ->constrained()
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();
            $table->foreignId('year_id')
                    ->constrained()
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();
            $table->foreignId('semester_id')
                    ->constrained()
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();
            $table->longText('description')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

         Schema::table('results', function (Blueprint $table) {
            $table->foreignId('deliberation_id')
                    ->constrained()
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliberations');
    }
};
