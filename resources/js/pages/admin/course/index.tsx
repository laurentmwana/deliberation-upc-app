import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { CoursesTable } from '@/shared/course/courses-table';
import { SharedData } from '@/types';
import { CourseModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    courses: PaginationProps<CourseModel>;
}

export default function Index() {
    const { courses } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Cours académiques" />
            <div className="container-sidebar space-y-6">
                <Heading title="Cours académiques">
                    Liste complète des cours offerts par l’institution.
                </Heading>

                <div className="flex items-center justify-between">
                    <div>{/* Tu pourras ajouter ici un filtre plus tard */}</div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#course.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>

                <CoursesTable courses={courses.data} />
                <Pagination items={courses} />
            </div>
        </AppLayout>
    );
}
