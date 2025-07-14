<?php

namespace App\Jobs;

use App\Models\Deliberation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\DeliberationService;

class ResultJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private Deliberation $deliberation)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $service = app(DeliberationService::class);

        $service->deliberate($this->deliberation);
    }
}
