import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { FacultyModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface IndexProps {
    faculty: FacultyModel;
}

export default function Index() {
    const { faculty } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title={`Faculté - ${faculty.name}`} />
            <div className="container-sidebar">
                <Heading title={`Faculté ${faculty.name}`}>Consultez les informations détaillées de cette faculté académique.</Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>{faculty.name}</CardTitle>
                        <CardDescription>Créée il y a {ago(faculty.created_at, { fullText: true })}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
