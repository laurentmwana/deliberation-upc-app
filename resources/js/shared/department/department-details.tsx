import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { DepartmentModel } from '@/types/model';
import { Link } from '@inertiajs/react';
import React from 'react';

interface DepartmentDetailProps {
    department: DepartmentModel;
}

export const DepartmentDetail: React.FC<DepartmentDetailProps> = ({ department }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    {department.name}
                    <span className="ml-2 text-base font-normal text-muted-foreground">({department.alias})</span>
                </CardTitle>
                <CardDescription className="pt-1">Informations détaillées du département</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p>
                    <span className="font-medium">Faculté :</span>{' '}
                    <Link className="hover:underline underline-offset-1" href={route('#faculty.show', { id: department.faculty_id })}>
                        {department.faculty.name}
                    </Link>
                </p>
                <p>
                    <span className="font-medium">Créé le :</span> {formatDate(department.created_at)}
                </p>
            </CardContent>
        </Card>
    );
};
