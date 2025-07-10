import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { SemesterModel } from '@/types/model';
import { FileText } from 'lucide-react';

type SemestersTableProps = {
    semesters: SemesterModel[];
};

export const SemestersTable: React.FC<SemestersTableProps> = ({ semesters }) => {
    if (semesters.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucun semestre enregistré</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Alias</TableHead>
                    <TableHead>Création</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {semesters.map((s) => (
                    <TableRow key={s.id}>
                        <TableCell>{s.full_name}</TableCell>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{ago(s.created_at)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
