import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { LevelForm } from '@/shared/level/level-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Création d'une promotion" />
            <div className="container-sidebar space-y-6">
                <Heading title="Création d'une promotion">
                    Ajoutez une nouvelle promotion pour structurer les niveaux d’études au sein d’un département.
                </Heading>

                <div className="max-w-2xl">
                    <LevelForm />
                </div>
            </div>
        </AppLayout>
    );
}
