import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { OrientationForm } from '@/shared/orientation/orientation-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Création d'une orientation" />
            <div className="container-sidebar space-y-6">
                <Heading title="Création d'une orientation">
                    Ajoutez une nouvelle orientation pour structurer les parcours ou spécialités d'un département.
                </Heading>

                <div className="max-w-2xl">
                    <OrientationForm />
                </div>
            </div>
        </AppLayout>
    );
}
