import { Heading } from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { GradeModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    grade: GradeModel;
}

export default function Show() {
    const { grade } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Détails de la note`} />
            <div className="container-sidebar">
                <Heading title={`Détails de la note`}>Informations détaillées sur la note attribuée.</Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>Score : {grade.score}</CardTitle>
                        <CardDescription>Note enregistrée {ago(grade.created_at, { fullText: true })}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-sm">
                            <strong>Étudiant :</strong> {grade.student?.name} {grade.student?.firstname}
                        </p>
                        <p className="text-sm">
                            <strong>Cours :</strong> {grade.course?.name}
                        </p>
                        <p className="text-sm">
                            <strong>Année académique :</strong> {grade.year?.name}
                        </p>
                        <p className="text-sm">
                            <strong>Promotion :</strong> {grade.level?.name}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
