<?php

namespace App\Imports;

use App\Enums\GenderEnum;
use App\Models\Student;
use App\Models\User;
use App\Models\ActualLevel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Str;

class StudentImport implements ToCollection, WithHeadingRow
{
    private array $errors = [];
    private int $successCount = 0;

    public function __construct(
        private int $levelId,
        private int $yearId
    ) {}

    public function collection(Collection $rows)
    {
        $rows->each(function ($row, $index) {
            // Convertir la Collection en tableau
            $rowArray = $row->toArray();
            $normalizedRow = $this->normalizeRow($rowArray);

            if ($this->validateRow($normalizedRow, $index + 2)) {
                $this->importStudent($normalizedRow, $index + 2);
            }
        });
    }

    private function normalizeRow(array $row): array
    {
        return [
            'name' => Str::upper(trim($row['nom'] ?? $row['NOM'] ?? '')),
            'firstname' => Str::title(Str::lower(trim($row['prenom'] ?? $row['PRENOM'] ?? ''))),
            'gender' => Str::upper(trim($row['genre'] ?? $row['GENRE'] ?? '')),
            'birth' => trim($row['date_naissance'] ?? $row['DATE_NAISSANCE'] ?? ''),
            'email' => Str::lower(trim($row['email'] ?? $row['EMAIL'] ?? ''))
        ];
    }

    private function validateRow(array $row, int $rowNumber): bool
    {
        $validator = Validator::make($row, [
            'name' => 'required|string|max:100',
            'firstname' => 'required|string|max:100',
            'gender' => ['required', new Enum(GenderEnum::class)],
            'birth' => 'required|date_format:d/m/Y',
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            $this->errors[$rowNumber] = $validator->errors()->all();
            return false;
        }

        return true;
    }

    private function importStudent(array $row, int $rowNumber): void
    {
        try {
            \DB::transaction(function () use ($row) {
                // Création du compte utilisateur
                $user = User::create([
                    'name' => 'Etudiant',
                    'email' => $row['email'],
                    'password' => Hash::make('12345678'),
                    'email_verified_at' => now(),
                ]);

                // Création de l'étudiant
                $student = Student::create([
                    'name' => $row['name'],
                    'firstname' => $row['firstname'],
                    'gender' => GenderEnum::from($row['gender']),
                    'birth' => \Carbon\Carbon::createFromFormat('d/m/Y', $row['birth']),
                    'registration_token' => $this->generateRegistrationToken(),
                    'user_id' => $user->id,
                ]);

                // Création de la relation actual_level
                ActualLevel::create([
                    'student_id' => $student->id,
                    'level_id' => $this->levelId,
                    'year_id' => $this->yearId,
                ]);
            });

            $this->successCount++;
        } catch (\Exception $e) {
            $this->errors[$rowNumber] = ['Erreur système: ' . $e->getMessage()];
        }
    }

    private function generateRegistrationToken(): string
    {
        return Str::upper(Str::substr(md5(uniqid()), 0, 8));
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function getSuccessCount(): int
    {
        return $this->successCount;
    }
}
