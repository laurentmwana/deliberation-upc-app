import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { DeliberationForm } from '@/shared/deliberation/deliberation-form';
import { DeliberationModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = {
    deliberation: DeliberationModel;
};

export default function Edit({ deliberation }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modifier une délibération" />
            <div className="container-sidebar space-y-6">
                <Heading title="Modification de la délibération">Mettez à jour les informations liées à cette délibération académique.</Heading>

                <div className="max-w-2xl">
                    <DeliberationForm deliberation={deliberation} />
                </div>
            </div>
        </AppLayout>
    );
}
