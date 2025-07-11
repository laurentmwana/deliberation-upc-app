import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { StudentModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    student: StudentModel;
}

export default function Show() {
    const { student } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Étudiant - ${student.name} ${student.firstname}`} />
            <div className="container-sidebar space-y-6">
                <Heading title="Détails de l’étudiant">
                    Consultez les informations détaillées concernant l’étudiant{' '}
                    <strong>
                        {student.name} {student.firstname}
                    </strong>
                    .
                </Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {student.name} {student.firstname}
                        </CardTitle>
                        <CardDescription>Inscrit il y a {ago(student.created_at, { fullText: true })}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
