<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Relevé de Notes - {{ $student->name }} {{ $student->firstname }}</title>
    <style>
        @page { margin: 1.5cm; }
        body {
            font-family: 'Inter', sans-serif;
            color: #2e4053;
            line-height: 1.5;
            background-color: #fff;
        }

        .header {
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 3px solid #154360;
        }

        .university-name {
            color: #154360;
            font-size: 20px;
            font-weight: bold;
        }

        .university-slogan {
            font-size: 13px;
            font-style: italic;
            color: #6366f1;
        }

        .document-title {
            font-size: 17px;
            margin-top: 10px;
            color: #154360;
            font-weight: 600;
        }

        .student-info {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            border-left: 4px solid #154360;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }

        .info-label {
            font-weight: bold;
            color: #154360;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 13px;
        }

        th {
            background-color: #154360;
            color: white;
            padding: 8px;
            text-align: left;
        }

        td {
            padding: 6px 8px;
            border-bottom: 1px solid #e5e7eb;
        }

        tr:hover {
            background-color: #f3f4f6;
        }

        .valid { background-color: #e0f2fe; }
        .compensable { background-color: #fef9c3; }
        .failed { background-color: #fee2e2; }
        .missing { background-color: #f3f4f6; }

        .summary-box {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            margin-top: 20px;
        }

        .decision-box {
            background-color: #154360;
            color: white;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            margin-top: 25px;
        }

        .footer {
            margin-top: 30px;
            font-size: 11px;
            text-align: center;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="university-name">UNIVERSITÉ PROTESTANTE AU CONGO</div>
        <div class="university-slogan">Vérité, Foi, Liberté</div>
        <div class="document-title">RELEVÉ DE NOTES ET RÉSULTAT ACADÉMIQUE</div>
    </div>

    <div class="student-info">
        <div class="info-grid">
            <div><span class="info-label">Nom:</span> {{ $student->name }}</div>
            <div><span class="info-label">Prénom(s):</span> {{ $student->firstname }}</div>
            <div><span class="info-label">Matricule:</span> {{ $student->registration_token }}</div>
            <div><span class="info-label">Sexe:</span> {{ $student->gender }}</div>
            <div><span class="info-label">Promotion:</span> {{ $deliberation->level->name }}</div>
            <div><span class="info-label">Année académique:</span> {{ $deliberation->year->name }}</div>
            <div><span class="info-label">Semestre:</span> {{ $deliberation->semester->full_name }}</div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th width="60%">Unité d'enseignement</th>
                <th width="10%">Note</th>
                <th width="10%">Crédits</th>
                <th width="20%">Statut</th>
            </tr>
        </thead>
        <tbody>
            @foreach($results['courses'] as $course)
                <tr class="@if($course['status'] === 'validé') valid
                          @elseif($course['status'] === 'compensable') compensable
                          @elseif($course['status'] === 'non validé') failed
                          @else missing @endif">
                    <td>{{ $course['course_name'] }}</td>
                    <td>{{ $course['has_grade'] ? number_format($course['score'], 2) : 'N/A' }}</td>
                    <td>{{ $course['credits'] }}</td>
                    <td>{{ ucfirst($course['status']) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary-box">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div>
                <p><strong>Crédits inscrits:</strong> {{ $results['total_credits'] }}</p>
                <p><strong>Crédits validés:</strong> {{ $results['obtained_credits'] }}</p>
            </div>
            <div>
                @if(!is_null($results['semester_average']))
                    <p><strong>Moyenne semestrielle:</strong> {{ number_format($results['semester_average'], 2) }}/20</p>
                @endif
                <p><strong>Taux de réussite:</strong>
                    {{ $results['total_credits'] > 0 ? round(($results['obtained_credits'] / $results['total_credits']) * 100) : 0 }}%
                </p>
            </div>
        </div>
    </div>

    <div class="decision-box">
        DÉCISION DU JURY: {{ strtoupper($results['decision']) }}
    </div>

    <div class="footer">
        Document généré le {{ now()->format('d/m/Y à H:i') }} — Système LMD UPC
    </div>
</body>
</html>
