import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { SharedData } from '@/types';
import { DeliberationModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    deliberation: DeliberationModel;
}

export default function Show() {
    const { deliberation } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title="Informations sur la délibération" />
            <div className="container-sidebar space-y-6">
                <Heading title="Détails de la délibération">
                    Voici les informations détaillées concernant la délibération{' '}
                    <strong>
                        {deliberation.level.name} {deliberation.year.name}
                    </strong>
                    .
                </Heading>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Délibération {deliberation.level.name} {deliberation.year.name}
                        </CardTitle>
                        <CardDescription>Créée {ago(deliberation.created_at, { fullText: true })}.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
