import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { LevelModel } from '@/types/model';
import React from 'react';

interface LevelDetailProps {
    level: LevelModel;
}

export const LevelDetail: React.FC<LevelDetailProps> = ({ level }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    {level.name}
                    <span className="ml-2 text-base font-normal text-muted-foreground">({level.alias})</span>
                </CardTitle>
                <CardDescription className="pt-1">Informations détaillées du niveau</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Département :</span> {level.department.name}
                    </p>
                    {level.orientation && (
                        <p>
                            <span className="font-medium">Orientation :</span> {level.orientation.name}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Créé le :</span> {formatDate(level.created_at)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
