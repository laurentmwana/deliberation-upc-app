import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { OrientationModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type OrientationsTableProps = {
    orientations: OrientationModel[];
};

export const OrientationsTable: React.FC<OrientationsTableProps> = ({ orientations }) => {
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    if (orientations.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucune orientation</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Promotions</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orientations.map((o) => {
                    return (
                        <TableRow key={o.id}>
                            <TableCell>{excerpt(o.name, 40)}</TableCell>
                            <TableCell>
                                {o.department ? (
                                    <Link className="hover:underline" href={route('#orientation.show', { id: o.department.id })}>
                                        {excerpt(o.department.name, 30)}
                                    </Link>
                                ) : (
                                    '-'
                                )}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{o.levels.length}</Badge>
                            </TableCell>
                            <TableCell>{ago(o.created_at)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm">
                                        <Link href={route('#orientation.edit', { id: o.id })}>
                                            <Edit size={14} />
                                        </Link>
                                    </Button>
                                    <Button variant="secondary" size="sm" asChild>
                                        <Link href={route('#orientation.show', { id: o.id })}>
                                            <Eye size={14} />
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => setModalDelete(true)}>
                                        <Trash size={14} />
                                    </Button>
                                    <ConfirmationPasswordDialog
                                        open={modalDelete}
                                        setOpen={setModalDelete}
                                        url={route('#orientation.destroy', { id: o.id })}
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
