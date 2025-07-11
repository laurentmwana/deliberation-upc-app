import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { GradeExcelForm } from '@/shared/grade/grade-excel-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Import / Export des notes" />
            <div className="container-sidebar space-y-6">
                <Heading title="Import / Export des notes">
                    Importez un fichier Excel pour enregistrer des notes ou exportez la fiche d’un cours.
                </Heading>

                <div className="max-w-2xl">
                    <GradeExcelForm />
                </div>
            </div>
        </AppLayout>
    );
}
