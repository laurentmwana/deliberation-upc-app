import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { FacultyForm } from '@/shared/faculty/faculty-form';
import { Head } from '@inertiajs/react';

export default function FacultyCreatePage() {
    return (
        <AppLayout>
            <Head title="Créer une faculté" />
            <div className="container-sidebar space-y-6">
                <Heading title="Créer une faculté">
                    Ajoutez une nouvelle faculté pour organiser les départements et les formations académiques.
                </Heading>

                <div className="max-w-2xl rounded-lg bg-white p-6 shadow">
                    <FacultyForm />
                </div>
            </div>
        </AppLayout>
    );
}
