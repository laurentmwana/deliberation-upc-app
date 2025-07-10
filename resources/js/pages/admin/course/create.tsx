import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { CourseForm } from '@/shared/course/course-form';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Création d'un cours" />
            <div className="container-sidebar space-y-6">
                <Heading title="Création d'un cours">
                    Ajoutez un nouveau cours pour enrichir le programme académique d'un niveau.
                </Heading>

                <div className="max-w-2xl">
                    <CourseForm />
                </div>
            </div>
        </AppLayout>
    );
}
