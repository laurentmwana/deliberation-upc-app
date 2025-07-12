import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { DeliberationForm } from '@/shared/deliberation/deliberation-form';
import { Head } from '@inertiajs/react';

export default function CreateDeliberation() {
    return (
        <AppLayout>
            <Head title="Nouvelle délibération" />
            <div className="container-sidebar space-y-6">
                <Heading title="Nouvelle délibération">
                    Enregistrez les résultats de la délibération pour un niveau donné.
                </Heading>

                <div className="max-w-2xl">
                    <DeliberationForm />
                </div>
            </div>
        </AppLayout>
    );
}
