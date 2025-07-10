import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { YearsTable } from '@/shared/year/years-table';
import { SharedData } from '@/types';
import { YearModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, usePage } from '@inertiajs/react';

interface IndexProps {
    years: PaginationProps<YearModel>;
}

export default function Index() {
    const { years } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Années académiques" />
            <div className="container-sidebar">
                <Heading title="Années académiques">Consultez et gérez les différentes années académiques disponibles.</Heading>
                <div className="mb-4 flex items-center justify-between">
                    <div>{/* filtre à ajouter ici si besoin */}</div>
                </div>
                <YearsTable years={years.data} />
                <Pagination items={years} />
            </div>
        </AppLayout>
    );
}
