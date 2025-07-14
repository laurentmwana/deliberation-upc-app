import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { OrientationDetail } from '@/shared/orientation/orientation-details';
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

                <OrientationDetail orientation={orientation} />
            </div>
        </AppLayout>
    );
}
