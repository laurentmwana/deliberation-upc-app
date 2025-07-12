<table>
    <thead>
        <tr>
            <th>NOM</th>
            <th>PRENOM</th>
            <th>GENRE</th>
            <th>DATE NAISSANCE</th>
            <th>EMAIL</th>
            <th>MATRICULE</th>
            <th>PROMOTION</th>
            <th>ANNEE ACADEMIQUE</th>
        </tr>
    </thead>
    <tbody>
        @foreach($students as $student)
        <tr>
            <td>{{ $student->name }}</td>
            <td>{{ $student->firstname }}</td>
            <td>{{ $student->gender }}</td>
            <td>{{ $student->birth ? $student->birth : 'N/A' }}</td>
            <td>{{ $student->user->email ?? 'N/A' }}</td>
            <td>{{ $student->registration_token }}</td>
            <td>{{ $student->actualLevel->level->name ?? 'N/A' }}</td>
            <td>{{ $student->actualLevel->year->name ?? 'N/A' }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
