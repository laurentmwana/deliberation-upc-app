import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { StudentExcelForm } from '@/shared/student/student-excel-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Import / Export des étudiants" />
            <div className="container-sidebar space-y-6">
                <Heading title="Import / Export des étudiants">
                    Importez un fichier Excel pour enregistrer des étudiants ou exportez la liste d’une promotion.
                </Heading>

                <div className="max-w-2xl">
                    <StudentExcelForm />
                </div>
            </div>
        </AppLayout>
    );
}
