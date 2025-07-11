import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { DepartmentsTable } from '@/shared/department/departments-table';
import { SharedData } from '@/types';
import { DepartmentModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    departments: PaginationProps<DepartmentModel>;
}

export default function Index() {
    const { departments } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Départements académiques" />
            <div className="container-sidebar">
                <Heading title="Départements académiques">Liste complète des départements et filières de l'institution.</Heading>
                <div className="mb-4 flex items-center justify-between">
                    <div>{/* filter */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#department.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>
                <DepartmentsTable departments={departments.data} />
                <Pagination items={departments} />
            </div>
        </AppLayout>
    );
}
