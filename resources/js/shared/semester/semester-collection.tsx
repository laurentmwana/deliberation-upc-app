import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {semesters.map((s) => {
                return (
                    <Card key={s.id}>
                        <CardHeader>
                            <CardTitle>{s.full_name}</CardTitle>
                            <CardDescription>{s.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs">{ago(s.created_at)}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
