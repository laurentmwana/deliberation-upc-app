import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { FilterInput } from '@/components/ui/filter-input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { LevelsTable } from '@/shared/level/levels-table';
import { SharedData } from '@/types';
import { LevelModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    levels: PaginationProps<LevelModel>;
}

export default function Index() {
    const { levels } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Promotions" />
            <div className="container-sidebar space-y-6">
                <Heading title="Promotions">Liste complète des promotions académiques disponibles.</Heading>

                <div className="flex items-center justify-between">
                    <FilterInput
                        availableSorts={[
                            { label: 'Nom', value: 'name' },
                            { label: 'Alias', value: 'alias' },
                            { label: 'Mise à jour', value: 'updated_at' },
                        ]}
                        url={route('#level.index')}
                    />
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#level.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>

                <LevelsTable levels={levels.data} />
                <Pagination items={levels} />
            </div>
        </AppLayout>
    );
}
