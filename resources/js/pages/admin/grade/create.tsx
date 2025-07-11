import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { GradeForm } from '@/shared/grade/grade-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Création d'une note" />
            <div className="container-sidebar space-y-6">
                <Heading title="Création d'une note">Ajoutez une nouvelle note pour un étudiant dans une promotion et un cours donnés.</Heading>

                <div className="max-w-2xl">
                    <GradeForm />
                </div>
            </div>
        </AppLayout>
    );
}
