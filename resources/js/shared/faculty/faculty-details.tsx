import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { FacultyModel } from '@/types/model';
import React from 'react';

interface FacultyDetailProps {
    faculty: FacultyModel;
}

export const FacultyDetail: React.FC<FacultyDetailProps> = ({ faculty }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{faculty.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p>
                    <span className="font-medium">Créé le :</span> {formatDate(faculty.created_at)}
                </p>
            </CardContent>
        </Card>
    );
};
