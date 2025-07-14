import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { FacultyDetail } from '@/shared/faculty/faculty-details';
import { SharedData } from '@/types';
import { FacultyModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    faculty: FacultyModel;
}

export default function Show() {
    const { faculty } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Faculté - ${faculty.name}`} />
            <div className="container-sidebar">
                <Heading title={`Faculté ${faculty.name}`}>Consultez les informations détaillées de cette faculté académique.</Heading>

                <FacultyDetail faculty={faculty} />
            </div>
        </AppLayout>
    );
}
