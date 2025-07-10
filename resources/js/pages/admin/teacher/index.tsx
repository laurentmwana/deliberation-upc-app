import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { TeachersTable } from '@/shared/teacher/teachers-table';
import { SharedData } from '@/types';
import { TeacherModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    teachers: PaginationProps<TeacherModel>;
}

export default function Index() {
    const { teachers } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Professeurs" />
            <div className="container-sidebar space-y-6">
                <Heading title="Professeurs">
                    Liste complète des professeurs disponibles.
                </Heading>

                <div className="flex items-center justify-between">
                    <div>{/* Tu pourras ajouter ici un filtre plus tard */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#teacher.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>

                <TeachersTable teachers={teachers.data} />
                <Pagination items={teachers} />
            </div>
        </AppLayout>
    );
}
