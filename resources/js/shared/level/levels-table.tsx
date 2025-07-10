import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { LevelModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type LevelsTableProps = {
    levels: LevelModel[];
};

export const LevelsTable: React.FC<LevelsTableProps> = ({ levels }) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    if (levels.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucune promotion</h3>
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
                    <TableHead>Département</TableHead>
                    <TableHead>Cours</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {levels.map((l) => (
                    <TableRow key={l.id}>
                        <TableCell>{excerpt(l.name, 40)}</TableCell>
                        <TableCell>{excerpt(l.alias, 10)}</TableCell>
                        <TableCell>
                            {l.department ? (
                                <Link className="hover:underline" href={route('#department.show', { id: l.department.id })}>
                                    {excerpt(l.department.name, 30)}
                                </Link>
                            ) : (
                                '-'
                            )}
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{l.courses.length}</Badge>
                        </TableCell>
                        <TableCell>{ago(l.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Link href={route('#level.edit', { id: l.id })}>
                                    <Button variant="outline" size="sm">
                                        <Edit size={14} />
                                    </Button>
                                </Link>

                                <Link href={route('#level.show', { id: l.id })}>
                                    <Button variant="secondary" size="sm">
                                        <Eye size={14} />
                                    </Button>
                                </Link>

                                <Button variant="destructive" size="sm" onClick={() => setDeleteId(l.id)}>
                                    <Trash size={14} />
                                </Button>

                                <ConfirmationPasswordDialog
                                    open={deleteId === l.id}
                                    setOpen={(open) => setDeleteId(open ? l.id : null)}
                                    url={route('#level.destroy', { id: l.id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
