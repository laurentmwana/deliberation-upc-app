import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { CourseModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    course: CourseModel;
}

export default function Show() {
    const { course } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title="Informations sur le cours" />
            <div className="container-sidebar space-y-6">
                <Heading title="Détails du cours">
                    Voici les informations détaillées concernant le cours <strong>{course.name}</strong>.
                </Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>Créé {ago(course.created_at, { fullText: true })}.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
