import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { UserModel } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import React, { useState } from 'react';

type UsersTableProps = {
    users: UserModel[];
};

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
    const [modalDeleteId, setModalDeleteId] = useState<number | null>(null);

    if (users.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucun utilisateur</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{excerpt(user.name, 40)}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>{ago(user.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('#user.edit', { id: user.id })}>
                                        <Edit size={14} />
                                    </Link>
                                </Button>
                                <Button variant="secondary" size="sm" asChild>
                                    <Link href={route('#user.show', { id: user.id })}>
                                        <Eye size={14} />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => setModalDeleteId(user.id)}>
                                    <Trash size={14} />
                                </Button>
                                <ConfirmationPasswordDialog
                                    open={modalDeleteId === user.id}
                                    setOpen={(open) => !open && setModalDeleteId(null)}
                                    url={route('#user.destroy', { id: user.id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
