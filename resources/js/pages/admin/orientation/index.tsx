import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { OrientationsTable } from '@/shared/orientation/orientations-table';
import { SharedData } from '@/types';
import { OrientationModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    orientations: PaginationProps<OrientationModel>;
}

export default function Index() {
    const { orientations } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Orientations académiques" />
            <div className="container-sidebar">
                <Heading title="Orientations académiques">Liste complète des orientations par département.</Heading>

                <div className="mb-4 flex items-center justify-between">
                    <div>{/* filtre ici si besoin */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#orientation.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>

                <OrientationsTable orientations={orientations.data} />
                <Pagination items={orientations} />
            </div>
        </AppLayout>
    );
}
