import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { OrientationModel } from '@/types/model';
import React from 'react';

interface OrientationDetailProps {
    orientation: OrientationModel;
}

export const OrientationDetail: React.FC<OrientationDetailProps> = ({ orientation }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{orientation.name}</CardTitle>
                <CardDescription className="pt-1">Informations détaillées de l’orientation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p>
                    <span className="font-medium">Département :</span> {orientation.department.name}
                </p>
                <p>
                    <span className="font-medium">Créé le :</span> {formatDate(orientation.created_at)}
                </p>
            </CardContent>
        </Card>
    );
};
