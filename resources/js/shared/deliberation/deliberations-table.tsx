import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { DeliberationModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import { useState } from 'react';

type DeliberationsTableProps = {
    deliberations: DeliberationModel[];
};

export const DeliberationsTable: React.FC<DeliberationsTableProps> = ({ deliberations }) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    if (deliberations.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucune délibération enregistrée</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Année académique</TableHead>
                    <TableHead>Promotion</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {deliberations.map((d) => (
                    <TableRow key={d.id}>
                        <TableCell>
                            {d.year ? (
                                <Link className="hover:underline" href={route('#year.show', { id: d.year.id })}>
                                    {d.year.name}
                                </Link>
                            ) : (
                                '-'
                            )}
                        </TableCell>
                        <TableCell>
                            {d.level ? (
                                <Link className="hover:underline" href={route('#level.show', { id: d.level.id })}>
                                    {excerpt(d.level.name, 30)}
                                </Link>
                            ) : (
                                '-'
                            )}
                        </TableCell>
                        <TableCell>{d.semester ? <Badge>{excerpt(d.semester.name, 30)}</Badge> : '-'}</TableCell>
                        <TableCell>{ago(d.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Link href={route('#deliberation.edit', { id: d.id })}>
                                    <Button variant="outline" size="sm">
                                        <Edit size={14} />
                                    </Button>
                                </Link>

                                <Link href={route('#deliberation.show', { id: d.id })}>
                                    <Button variant="secondary" size="sm">
                                        <Eye size={14} />
                                    </Button>
                                </Link>

                                <Button variant="destructive" size="sm" onClick={() => setDeleteId(d.id)}>
                                    <Trash size={14} />
                                </Button>

                                <ConfirmationPasswordDialog
                                    open={deleteId === d.id}
                                    setOpen={(open) => setDeleteId(open ? d.id : null)}
                                    url={route('#deliberation.destroy', { id: d.id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
