import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GradeModel } from '@/types/model';
import React from 'react';

interface GradeDetailProps {
    grade: GradeModel;
}

export const GradeDetail: React.FC<GradeDetailProps> = ({ grade }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Note : {grade.score.toFixed(1)}/20</CardTitle>
                <CardDescription className="pt-1">Détail de la note attribuée à l'étudiant</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Étudiant :</span> {grade.student.firstname} {grade.student.name}
                    </p>
                    <p>
                        <span className="font-medium">Cours :</span> {grade.course.name}
                    </p>
                </div>
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Promotion :</span> {grade.level.name}
                    </p>
                    <p>
                        <span className="font-medium">Année académique :</span> {grade.year.name}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
