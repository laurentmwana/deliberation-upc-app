import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { TeacherModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type TeachersTableProps = {
    teachers: TeacherModel[];
};

export const TeachersTable: React.FC<TeachersTableProps> = ({ teachers }) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    if (teachers.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucun professeur enregistré</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Postnom</TableHead>
                    <TableHead>Départements</TableHead>
                    <TableHead>Cours</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {teachers.map((t) => (
                    <TableRow key={t.id}>
                        <TableCell>{excerpt(t.name, 25)}</TableCell>
                        <TableCell>{excerpt(t.firstname, 25)}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{t.departments.length}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{t.courses.length}</Badge>
                        </TableCell>
                        <TableCell>{ago(t.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Link href={route('#teacher.edit', { id: t.id })}>
                                    <Button variant="outline" size="sm">
                                        <Edit size={14} />
                                    </Button>
                                </Link>

                                <Link href={route('#teacher.show', { id: t.id })}>
                                    <Button variant="secondary" size="sm">
                                        <Eye size={14} />
                                    </Button>
                                </Link>

                                <Button variant="destructive" size="sm" onClick={() => setDeleteId(t.id)}>
                                    <Trash size={14} />
                                </Button>

                                <ConfirmationPasswordDialog
                                    open={deleteId === t.id}
                                    setOpen={(open) => setDeleteId(open ? t.id : null)}
                                    url={route('#teacher.destroy', { id: t.id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
