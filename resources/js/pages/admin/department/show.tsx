import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { DepartmentDetail } from '@/shared/department/department-details';
import { SharedData } from '@/types';
import { DepartmentModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    department: DepartmentModel;
}

export default function Show() {
    const { department } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Informations détaillées`} />
            <div className="container-sidebar">
                <Heading title={`Informations détaillées`}>Informations détaillées du département académique.</Heading>

                <DepartmentDetail department={department} />
            </div>
        </AppLayout>
    );
}
