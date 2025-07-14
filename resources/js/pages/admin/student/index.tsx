import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { FilterInput } from '@/components/ui/filter-input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { StudentsTable } from '@/shared/student/students-table';
import { SharedData } from '@/types';
import { StudentModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    students: PaginationProps<StudentModel>;
}

export default function Index() {
    const { students } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Étudiants" />
            <div className="container-sidebar space-y-6">
                <Heading title="Liste des étudiants">Retrouvez la liste complète des étudiants inscrits dans l’établissement.</Heading>
                <div className="mb-4 flex items-center justify-between">
                    <FilterInput
                        availableSorts={[
                            { label: 'Nom', value: 'name' },
                            { label: 'Postnom', value: 'firstname' },
                            { label: 'Genre', value: 'gender' },
                            { label: 'Matricule', value: 'registration_token' },
                            { label: "Date d'anniversaire", value: 'birth' },
                            { label: 'Mise à jour', value: 'updated_at' },
                        ]}
                        url={route('#student.index')}
                    />
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#student.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>
                <StudentsTable students={students.data} />
                <Pagination items={students} />
            </div>
        </AppLayout>
    );
}
