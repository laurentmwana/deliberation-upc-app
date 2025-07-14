import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { FacultyModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type FacultiesTableProps = {
    faculties: FacultyModel[];
};

export const FacultiesTable: React.FC<FacultiesTableProps> = ({ faculties }) => {
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    if (faculties.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucune faculté</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Départements</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {faculties.map((f) => {
                    return (
                        <TableRow key={f.id}>
                            <TableCell>{excerpt(f.name, 40)}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{f.departments.length}</Badge>
                            </TableCell>
                            <TableCell>{ago(f.created_at)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm">
                                        <Link href={route('#faculty.edit', { id: f.id })}>
                                            <Edit size={14} />
                                        </Link>
                                    </Button>
                                    <Button variant="secondary" size="sm" asChild>
                                        <Link href={route('#faculty.show', { id: f.id })}>
                                            <Eye size={14} />
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => setModalDelete(true)}>
                                        <Trash size={14} />
                                    </Button>
                                    <ConfirmationPasswordDialog
                                        open={modalDelete}
                                        setOpen={setModalDelete}
                                        url={route('#faculty.destroy', { id: f.id })}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
