import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { DepartmentForm } from '@/shared/department/department-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Création d'un département" />
            <div className="container-sidebar space-y-6">
                <Heading title="Création d'un département">
                    Ajoutez un nouveau département pour organiser les filières et programmes académiques.
                </Heading>

                <div className="max-w-2xl">
                    <DepartmentForm />
                </div>
            </div>
        </AppLayout>
    );
}
