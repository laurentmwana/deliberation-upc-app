import { Heading } from '@/components/heading';
import { FilterInput } from '@/components/ui/filter-input';
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
                    <FilterInput
                        availableSorts={[
                            { label: 'Nom', value: 'name' },
                            { label: 'Cloturée', value: 'is_closed' },
                            { label: 'Mise à jour', value: 'updated_at' },
                        ]}
                        url={route('#year.index')}
                    />
                </div>
                <YearsTable years={years.data} />
                <Pagination items={years} />
            </div>
        </AppLayout>
    );
}
