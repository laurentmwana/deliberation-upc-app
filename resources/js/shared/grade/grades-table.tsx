import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { GradeModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type GradesTableProps = {
    grades: GradeModel[];
};

export const GradesTable: React.FC<GradesTableProps> = ({ grades }) => {
    const [modalDeleteId, setModalDeleteId] = useState<number | null>(null);

    if (grades.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucune note enregistrée</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Étudiant</TableHead>
                    <TableHead>Cours</TableHead>
                    <TableHead>Promotion</TableHead>
                    <TableHead>Année académique</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {grades.map((grade) => (
                    <TableRow key={grade.id}>
                        <TableCell>{grade.student ? `${excerpt(grade.student.name, 25)} ${excerpt(grade.student.firstname, 25)}` : '-'}</TableCell>
                        <TableCell>{grade.course?.name ?? '-'}</TableCell>
                        <TableCell>{grade.level?.name ?? '-'}</TableCell>
                        <TableCell>{grade.year?.name ?? '-'}</TableCell>
                        <TableCell>{grade.score.toFixed(1)}</TableCell>
                        <TableCell>{ago(grade.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('#grade.edit', { id: grade.id })}>
                                        <Edit size={14} />
                                    </Link>
                                </Button>

                                <Button variant="secondary" size="sm" asChild>
                                    <Link href={route('#grade.show', { id: grade.id })}>
                                        <Eye size={14} />
                                    </Link>
                                </Button>

                                <Button variant="destructive" size="sm" onClick={() => setModalDeleteId(grade.id)}>
                                    <Trash size={14} />
                                </Button>

                                <ConfirmationPasswordDialog
                                    open={modalDeleteId === grade.id}
                                    setOpen={(open) => setModalDeleteId(open ? grade.id : null)}
                                    url={route('#grade.destroy', { id: grade.id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
