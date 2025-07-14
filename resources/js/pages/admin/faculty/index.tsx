import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { FilterInput } from '@/components/ui/filter-input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { FacultiesTable } from '@/shared/faculty/faculties-table';
import { SharedData } from '@/types';
import { FacultyModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    faculties: PaginationProps<FacultyModel>;
}

export default function Index() {
    const { faculties } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Liste des facultés" />
            <div className="container-sidebar">
                <Heading title="Liste des facultés">Consultez et gérez l'ensemble des facultés de l'établissement.</Heading>
                <div className="mb-4 flex items-center justify-between">
                    <FilterInput
                        availableSorts={[
                            { label: 'Nom', value: 'name' },
                            { label: 'Date de création', value: 'created_at' },
                            { label: 'Mise à jour', value: 'updated_at' },
                        ]}
                        url={route('#faculty.index')}
                    />
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#faculty.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>
                <FacultiesTable faculties={faculties.data} />
                <Pagination items={faculties} />
            </div>
        </AppLayout>
    );
}
