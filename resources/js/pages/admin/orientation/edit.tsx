import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { OrientationForm } from '@/shared/orientation/orientation-form';
import { OrientationModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = { orientation: OrientationModel };

export default function Edit({ orientation }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modifier une orientation" />
            <div className="container-sidebar">
                <Heading title="Modification de l'orientation">
                    Mise à jour des informations de l'orientation.
                </Heading>

                <div className="max-w-2xl">
                    <OrientationForm orientation={orientation} />
                </div>
            </div>
        </AppLayout>
    );
}
