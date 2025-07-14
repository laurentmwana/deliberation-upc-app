import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { TeacherForm } from '@/shared/teacher/teacher-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Création d'un professeur" />
            <div className="container-sidebar space-y-6">
                <Heading title="Création d'un professeur">
                    Ajoutez un nouveau professeur afin de structurer les niveaux d’études au sein d’un département.
                </Heading>

                <div className="max-w-2xl">
                    <TeacherForm />
                </div>
            </div>
        </AppLayout>
    );
}
