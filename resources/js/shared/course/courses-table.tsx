import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationPasswordDialog } from '@/components/ui/dialog-confirmation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { CourseModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Edit, Eye, FileText, Trash } from 'lucide-react';
import { useState } from 'react';

type CoursesTableProps = {
    courses: CourseModel[];
};

export const CoursesTable: React.FC<CoursesTableProps> = ({ courses }) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    if (courses.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucun course enregistré</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Crédits</TableHead>
                    <TableHead>Promotion</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((c) => (
                    <TableRow key={c.id}>
                        <TableCell>{excerpt(c.name, 25)}</TableCell>
                        <TableCell>
                            <Badge>{c.credits}</Badge>
                        </TableCell>
                        <TableCell>
                            {c.level ? (
                                <Link className="hover:underline" href={route('#level.show', { id: c.level.id })}>
                                    {excerpt(c.level.name, 30)}
                                </Link>
                            ) : (
                                '-'
                            )}
                        </TableCell>
                        <TableCell>
                            {c.semester ? (
                                <Link href="#" className="hover:underline">
                                    {excerpt(c.semester.name, 30)}
                                </Link>
                            ) : (
                                '-'
                            )}
                        </TableCell>
                        <TableCell>{ago(c.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Link href={route('#course.edit', { id: c.id })}>
                                    <Button variant="outline" size="sm">
                                        <Edit size={14} />
                                    </Button>
                                </Link>

                                <Link href={route('#course.show', { id: c.id })}>
                                    <Button variant="secondary" size="sm">
                                        <Eye size={14} />
                                    </Button>
                                </Link>

                                <Button variant="destructive" size="sm" onClick={() => setDeleteId(c.id)}>
                                    <Trash size={14} />
                                </Button>

                                <ConfirmationPasswordDialog
                                    open={deleteId === c.id}
                                    setOpen={(open) => setDeleteId(open ? c.id : null)}
                                    url={route('#course.destroy', { id: c.id })}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
