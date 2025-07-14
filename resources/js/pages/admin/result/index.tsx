import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { ResultForm } from '@/shared/result/result-form';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AppLayout>
            <Head title="Délibération" />
            <div className="container-sidebar space-y-6">
                <Heading title="Délibération">Sélectionnez la promotion, le semestre et l’année académique, puis lancez la délibération.</Heading>
                <div className="max-w-2xl">
                    <ResultForm />
                </div>
            </div>
        </AppLayout>
    );
}
