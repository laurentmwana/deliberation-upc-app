import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { CourseForm } from '@/shared/course/course-form';
import { CourseModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = {
    course: CourseModel;
};

export default function Edit({ course }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modifier un cours" />
            <div className="container-sidebar space-y-6">
                <Heading title="Modification du cours">Mettez à jour les informations de ce cours académique.</Heading>

                <div className="max-w-2xl">
                    <CourseForm course={course} />
                </div>
            </div>
        </AppLayout>
    );
}
