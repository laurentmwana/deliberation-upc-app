import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { DepartmentModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    department: DepartmentModel;
}

export default function Show() {
    const { department } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Informations détaillées`} />
            <div className="container-sidebar">
                <Heading title={`Informations détaillées`}>Informations détaillées du département académique.</Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>{department.name}</CardTitle>
                        <CardDescription>Créé {ago(department.created_at, { fullText: true })}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
