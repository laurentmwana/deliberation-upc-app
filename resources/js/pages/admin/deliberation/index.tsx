import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { FilterInput } from '@/components/ui/filter-input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { DeliberationsTable } from '@/shared/deliberation/deliberations-table';
import { SharedData } from '@/types';
import { DeliberationModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    deliberations: PaginationProps<DeliberationModel>;
}

export default function Index() {
    const { deliberations } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Délibérations académiques" />
            <div className="container-sidebar space-y-6">
                <Heading title="Délibérations académiques">
                    Liste des délibérations enregistrées pour les différents niveaux et années académiques.
                </Heading>

                <div className="flex items-center justify-between">
                    <FilterInput
                        availableSorts={[
                            { label: 'Complète', value: 'completed_at' },
                            { label: 'Date de création', value: 'created_at' },
                            { label: 'Mise à jour', value: 'updated_at' },
                        ]}
                        url={route('#deliberation.index')}
                    />
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#deliberation.create')}>
                            <Plus size={15} className="mr-1" />
                        </Link>
                    </Button>
                </div>

                <DeliberationsTable deliberations={deliberations.data} />
                <Pagination items={deliberations} />
            </div>
        </AppLayout>
    );
}
