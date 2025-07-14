import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { DeliberationDetail } from '@/shared/deliberation/deliberation-details';
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

                <DeliberationDetail deliberation={deliberation} />
            </div>
        </AppLayout>
    );
}
