import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { StudentModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type StudentsTableProps = {
    students: StudentModel[];
};

export const StudentsTable: React.FC<StudentsTableProps> = ({ students }) => {
    const [modalDeleteId, setModalDeleteId] = useState<number | null>(null);

    if (students.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucun étudiant enregistré</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Promotion</TableHead>
                    <TableHead>Année académique</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((student) => (
                    <TableRow key={student.id}>
                        <TableCell>{excerpt(student.name, 25)}</TableCell>
                        <TableCell>{excerpt(student.firstname, 25)}</TableCell>
                        <TableCell>
                            <Badge>{student.gender}</Badge>
                        </TableCell>
                        <TableCell>{student.actual_level?.level?.name ?? '-'}</TableCell>
                        <TableCell>{student.actual_level?.year?.name ?? '-'}</TableCell>
                        <TableCell>{ago(student.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('#student.edit', { id: student.id })}>
                                        <Edit size={14} />
                                    </Link>
                                </Button>

                                <Button variant="secondary" size="sm" asChild>
                                    <Link href={route('#student.show', { id: student.id })}>
                                        <Eye size={14} />
                                    </Link>
                                </Button>

                                <Button variant="destructive" size="sm" onClick={() => setModalDeleteId(student.id)}>
                                    <Trash size={14} />
                                </Button>

                                <ConfirmationPasswordDialog
                                    open={modalDeleteId === student.id}
                                    setOpen={(open) => setModalDeleteId(open ? student.id : null)}
                                    url={route('#student.destroy', { id: student.id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
