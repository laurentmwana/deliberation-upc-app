import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { YearModel } from '@/types/model';
import React from 'react';

interface YearDetailProps {
    year: YearModel;
}

export const YearDetail: React.FC<YearDetailProps> = ({ year }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{year.name}</CardTitle>
                    {year.is_closed && <Badge variant="destructive">Clôturée</Badge>}
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Statut :</span> {year.is_closed ? 'Clôturée' : 'Active'}
                    </p>
                    {year.closed_at && (
                        <p>
                            <span className="font-medium">Clôturée le :</span> {formatDate(year.closed_at)}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
