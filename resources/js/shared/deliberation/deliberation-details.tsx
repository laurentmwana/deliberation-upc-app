import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { DeliberationModel } from '@/types/model';
import React from 'react';

interface DeliberationDetailProps {
    deliberation: DeliberationModel;
}

export const DeliberationDetail: React.FC<DeliberationDetailProps> = ({ deliberation }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Délibération #{deliberation.id}</CardTitle>
                <CardDescription>{deliberation.description ?? 'Aucune description'}</CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Niveau :</span> {deliberation.level.name}
                    </p>
                    <p>
                        <span className="font-medium">Année académique :</span> {deliberation.year.name}
                    </p>
                    <Badge>{deliberation.semester.full_name}</Badge>
                </div>

                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Créée le :</span> {formatDate(deliberation.created_at)}
                    </p>
                    <p>
                        <span className="font-medium">Dernière mise à jour :</span> {formatDate(deliberation.updated_at)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
