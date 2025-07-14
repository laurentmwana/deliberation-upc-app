<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Year;
use App\Services\SearchableService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class AdminYearController extends Controller
{
private const FIELDS = [
        'name',
        'alias',
        'created_at',
    ];

    private const COLUMNS_SORT = [
        'name',
        'alias',
        'is_closed',
        'created_at',
        'updated_at',
    ];

    public function index(SearchableService $searchable): Response
    {
        $builder = $searchable->handle(
            Year::query(),
            self::FIELDS,
        );

        $years = QueryBuilder::for($builder)
            ->allowedSorts(self::COLUMNS_SORT)
            ->defaultSort('-updated_at')
            ->paginate();

        return Inertia::render('admin/year/index', [
            'years' => $years,
        ]);
    }

    public function closed(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $year = Year::findOrFail($id);

        $this->createNewYear($year);

        return redirect()->route('#year.index')
            ->with('message', 'année scolaire supprimée');

    }

    public function show(Request $request, string $id): Response
    {
        $year = Year::findOrFail($id);

        return Inertia::render('admin/year/show', [
            'year' => $year
        ]);

    }

    private function createNewYear(Year $year): Year
    {
        [$nameYear, $start, $end] = $this->getYearName($year);

        $existingYear = Year::where('name', $nameYear)->first();

        if ($existingYear) {
            throw new \Exception("L'année académique $nameYear existe déjà.");
        }

        $newYear =  Year::create([
            'start' => $start,
            'end'   => $end,
            'name'  => $nameYear,
            'school_id' => $year->school_id,
        ]);

        if ($newYear instanceof Year) {
            $year->update(['is_closed' => true, 'closed_at' => now()]);
        }

        return $newYear;
    }

    private function getYearName(Year $year): array
    {
        $start = $year->end;
        $end = $year->end + 1;

        return [
            "{$start}-{$end}",
            $start,
            $end,
        ];
    }
}
