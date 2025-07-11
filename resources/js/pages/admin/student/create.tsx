import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { StudentForm } from '@/shared/student/student-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Nouvel étudiant" />
            <div className="container-sidebar space-y-6">
                <Heading title="Enregistrement d’un étudiant">
                    Ajoutez un nouvel étudiant pour l’inscrire à une promotion académique.
                </Heading>

                <div className="max-w-2xl">
                    <StudentForm />
                </div>
            </div>
        </AppLayout>
    );
}
