import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-time';
import { CourseModel } from '@/types/model';
import React from 'react';

interface CourseDetailProps {
    course: CourseModel;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    {course.name}
                    <span className="ml-2 text-base font-normal text-muted-foreground">
                        ({course.alias}) – {course.credits} crédits
                    </span>
                </CardTitle>
                <CardDescription className="pt-1">Détails du cours et informations associées</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Promotion :</span> {course.level.name}
                    </p>
                    <p>
                        <span className="font-medium">Enseignant :</span> {course.teacher.firstname} {course.teacher.name}
                    </p>
                </div>
                <div className="space-y-2">
                    <Badge>{course.semester.full_name}</Badge>
                    <p>
                        <span className="font-medium">Créé le :</span> {formatDate(course.created_at)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
