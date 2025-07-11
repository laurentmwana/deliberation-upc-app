import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { GradesTable } from '@/shared/grade/grades-table';
import { SharedData } from '@/types';
import { GradeModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    grades: PaginationProps<GradeModel>;
}

export default function Index() {
    const { grades } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Notes" />
            <div className="container-sidebar">
                <Heading title="Notes">Liste complète des notes enregistrées.</Heading>
                <div className="mb-4 flex items-center justify-between">
                    <div>{/* filtre éventuel */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#grade.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>
                <GradesTable grades={grades.data} />
                <Pagination items={grades} />
            </div>
        </AppLayout>
    );
}
