import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { YearModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    year: YearModel;
}

export default function Show() {
    const { year } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Année académique ${year.name}`} />
            <div className="container-sidebar">
                <Heading title={`Année académique ${year.name}`}>
                    Consultez les informations détaillées de cette année académique.
                </Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>{year.name}</CardTitle>
                        <CardDescription>Créée il y a {ago(year.created_at, { fullText: true })}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
