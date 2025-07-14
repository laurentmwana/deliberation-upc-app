<table>
    <thead>
        <tr>
            @foreach($headers as $header)
                <th style="font-weight: bold; background-color: #f8f9fa; border: 1px solid #dee2e6; padding: 8px;">{{ $header }}</th>
            @endforeach
        </tr>
    </thead>
    <tbody>
        @forelse($students as $student)
            <tr>
                <td style="border: 1px solid #dee2e6; padding: 8px;">
                    {{ $student->name }} {{ $student->firstname }}
                </td>
                <td style="border: 1px solid #dee2e6; padding: 8px;">
                    {{ $student->registration_token ?? 'N/A' }}
                </td>
                <td style="border: 1px solid #dee2e6; padding: 8px;">
                    {{ $student->actualLevel->level->name ?? 'N/A' }}
                </td>
                <td style="border: 1px solid #dee2e6; padding: 8px;">
                    {{ $student->actualLevel->year->name ?? 'N/A' }}
                </td>
                <td style="border: 1px solid #dee2e6; padding: 8px;">
                    {{ $courseName }}
                </td>
                <td style="border: 1px solid #dee2e6; padding: 8px; text-align: center;">
                    @if($student->score !== null)
                        {{ number_format($student->score, 2) }}
                    @else
                        <span style="color: #6c757d;">Non noté</span>
                    @endif
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="6" style="text-align: center; border: 1px solid #dee2e6; padding: 8px;">
                    Aucun étudiant trouvé
                </td>
            </tr>
        @endforelse
    </tbody>
</table>
