import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { DepartmentForm } from '@/shared/department/department-form';
import { DepartmentModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = { department: DepartmentModel };

export default function Edit({ department }: EditProps) {
    return (
        <AppLayout>
            <Head title={`Édition - ${department.name}`} />
            <div className="container-sidebar">
                <Heading title={`Modification du département`}>Mise à jour des informations du département {department.name}.</Heading>

                <div className="max-w-2xl">
                    <DepartmentForm department={department} />
                </div>
            </div>
        </AppLayout>
    );
}
