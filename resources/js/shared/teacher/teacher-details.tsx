import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { TeacherModel } from '@/types/model';
import React from 'react';

interface TeacherDetailProps {
    teacher: TeacherModel;
}

export const TeacherDetail: React.FC<TeacherDetailProps> = ({ teacher }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    {teacher.firstname} {teacher.name}
                    <span className="ml-2 text-sm text-muted-foreground">{teacher.gender}</span>
                </CardTitle>
                <CardDescription className="pt-1">Informations personnelles et départements</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Téléphone :</span> {teacher.phone}
                    </p>
                    <p>
                        <span className="font-medium">Départements :</span> {teacher.departments.map((d) => d.name).join(', ')}
                    </p>
                </div>
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Créé le :</span> {formatDate(teacher.created_at)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
