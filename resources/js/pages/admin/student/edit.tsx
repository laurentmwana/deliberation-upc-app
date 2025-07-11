import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { StudentForm } from '@/shared/student/student-form';
import { StudentModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = {
    student: StudentModel;
};

export default function Edit({ student }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modification d’un étudiant" />
            <div className="container-sidebar space-y-6">
                <Heading title="Modification d’un étudiant">
                    Mettez à jour les informations de l’étudiant <strong>{student.name} {student.firstname}</strong>.
                </Heading>

                <div className="max-w-2xl">
                    <StudentForm student={student} />
                </div>
            </div>
        </AppLayout>
    );
}
