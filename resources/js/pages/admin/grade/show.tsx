import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { GradeDetail } from '@/shared/grade/grade-details';
import { SharedData } from '@/types';
import { GradeModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    grade: GradeModel;
}

export default function Show() {
    const { grade } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Détails de la note`} />
            <div className="container-sidebar">
                <Heading title={`Détails de la note`}>Informations détaillées sur la note attribuée.</Heading>

                <GradeDetail grade={grade} />
            </div>
        </AppLayout>
    );
}
