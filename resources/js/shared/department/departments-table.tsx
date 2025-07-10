import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { DepartmentModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type DepartmentsTableProps = {
    departments: DepartmentModel[];
};

export const DepartmentsTable: React.FC<DepartmentsTableProps> = ({ departments }) => {
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    if (departments.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucun département</h3>
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
                    <TableHead>Faculté</TableHead>
                    <TableHead>Promotions</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {departments.map((d) => {
                    return (
                        <TableRow key={d.id}>
                            <TableCell>{excerpt(d.name, 40)}</TableCell>
                            <TableCell>{excerpt(d.alias, 10)}</TableCell>
                            <TableCell>
                                {d.faculty ? (
                                    <Link className="hover:underline" href={route('#faculty.show', { id: d.faculty.id })}>
                                        {excerpt(d.faculty.name, 30)}
                                    </Link>
                                ) : (
                                    '-'
                                )}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{d.levels.length}</Badge>
                            </TableCell>
                            <TableCell>{ago(d.created_at)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm">
                                        <Link href={route('#department.edit', { id: d.id })}>
                                            <Edit size={14} />
                                        </Link>
                                    </Button>
                                    <Button variant="secondary" size="sm" asChild>
                                        <Link href={route('#department.show', { id: d.id })}>
                                            <Eye size={14} />
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => setModalDelete(true)}>
                                        <Trash size={14} />
                                    </Button>
                                    <ConfirmationPasswordDialog
                                        open={modalDelete}
                                        setOpen={setModalDelete}
                                        url={route('#department.destroy', { id: d.id })}
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
