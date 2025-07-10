import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { SemestersTable } from '@/shared/semester/semesters-table';
import { SharedData } from '@/types';
import { SemesterModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, usePage } from '@inertiajs/react';

interface IndexProps {
    semesters: PaginationProps<SemesterModel>;
}

export default function Index() {
    const { semesters } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Semestres" />
            <div className="container-sidebar space-y-6">
                <Heading title="Semestres académiques">Liste complète des semestres utilisés pour organiser les programmes d’enseignement.</Heading>

                <SemestersTable semesters={semesters.data} />
                <Pagination items={semesters} />
            </div>
        </AppLayout>
    );
}
