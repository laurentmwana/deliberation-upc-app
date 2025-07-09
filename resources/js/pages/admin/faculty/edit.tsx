import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { FacultyForm } from '@/shared/faculty/faculty-form';
import { FacultyModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = { faculty: FacultyModel };

export default function Edit({ faculty }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modifier une faculté" />
            <div className="container-sidebar">
                <Heading title="Modifier la faculté">
                    Modifiez les informations de cette faculté pour mettre à jour l'organisation académique.
                </Heading>

                <div className="max-w-2xl">
                    <FacultyForm faculty={faculty} />
                </div>
            </div>
        </AppLayout>
    );
}
