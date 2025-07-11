import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { GradeForm } from '@/shared/grade/grade-form';
import { GradeModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = { grade: GradeModel };

export default function Edit({ grade }: EditProps) {
    return (
        <AppLayout>
            <Head title={`Édition - Note #${grade.id}`} />
            <div className="container-sidebar">
                <Heading title={`Modification de la note`}>Mise à jour des informations de la note n°{grade.id}.</Heading>

                <div className="max-w-2xl">
                    <GradeForm grade={grade} />
                </div>
            </div>
        </AppLayout>
    );
}
