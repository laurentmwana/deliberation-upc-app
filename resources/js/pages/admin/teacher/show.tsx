import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { TeacherModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    teacher: TeacherModel;
}

export default function Show() {
    const { teacher } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title="Informations sur le professeur" />
            <div className="container-sidebar space-y-6">
                <Heading title="Détails du professeur">
                    Voici les informations détaillées concernant le professeur <strong>{teacher.name}</strong>.
                </Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>{teacher.name}</CardTitle>
                        <CardDescription>Créé {ago(teacher.created_at, { fullText: true })}.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
