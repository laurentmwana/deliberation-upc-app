import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { TeacherForm } from '@/shared/teacher/teacher-form';
import { TeacherModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = { teacher: TeacherModel };

export default function Edit({ teacher }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modifier un professeur" />
            <div className="container-sidebar space-y-6">
                <Heading title="Modifier un professeur">
                    Modifiez les informations du professeur <strong>{teacher.name}</strong> pour refléter les changements souhaités.
                </Heading>

                <div className="max-w-2xl">
                    <TeacherForm teacher={teacher} />
                </div>
            </div>
        </AppLayout>
    );
}
