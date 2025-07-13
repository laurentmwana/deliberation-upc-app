<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResultRequest;
use App\Jobs\ResultJob;
use App\Models\Deliberation;
use App\Services\DeliberationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class AdminResultController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/result/index');
    }

    public function published(ResultRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $deliberation = Deliberation::firstOrCreate(
            [
                'level_id' => $validated['level_id'],
                'year_id' => $validated['year_id'],
                'semester_id' => $validated['semester_id'],
            ],
        );

        ResultJob::dispatch($deliberation);

        return redirect()->route('#result.index')
            ->with('success', 'Délibération effectuée avec succès.');
    }
}
