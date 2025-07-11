import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { excerpt } from '@/lib/utils';
import { YearModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Eye, FileText, Trash } from 'lucide-react';
import { useState } from 'react';

type YearsTableProps = {
    years: YearModel[];
};

export const YearsTable: React.FC<YearsTableProps> = ({ years }) => {
    const [closed, setClosed] = useState<number | null>(null);

    if (years.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucune année académique</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Début</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Clôturée</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {years.map((y) => (
                    <TableRow key={y.id}>
                        <TableCell>{excerpt(y.name, 25)}</TableCell>
                        <TableCell>
                            <Badge>{y.start}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge>{y.end}</Badge>
                        </TableCell>
                        <TableCell>{y.closed_at ? <Badge variant="destructive">Oui</Badge> : <Badge variant="outline">Non</Badge>}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Link href={route('#year.show', { id: y.id })}>
                                    <Button variant="secondary" size="sm">
                                        <Eye size={14} />
                                    </Button>
                                </Link>

                                {!y.closed_at && (
                                    <>
                                        <Button variant="destructive" size="sm" onClick={() => setClosed(y.id)}>
                                            <Trash size={14} />
                                        </Button>

                                        <ConfirmationPasswordDialog
                                            title="Clôturer l’année académique"
                                            description={`Êtes-vous sûr de vouloir clôturer l’année "${y.name}" ? Cette action est irréversible.`}
                                            open={closed === y.id}
                                            setOpen={(open) => setClosed(open ? y.id : null)}
                                            url={route('#year.closed', { id: y.id })}
                                        />
                                    </>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
