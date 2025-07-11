import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { OrientationModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    orientation: OrientationModel;
}

export default function Show() {
    const { orientation } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title="Détails de l'orientation" />
            <div className="container-sidebar">
                <Heading title="Détails de l'orientation">Informations détaillées de l'orientation académique.</Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>{orientation.name}</CardTitle>
                        <CardDescription>Créée {ago(orientation.created_at, { fullText: true })}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
