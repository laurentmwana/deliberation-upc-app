import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { FilterInput } from '@/components/ui/filter-input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { UsersTable } from '@/shared/user/users-table';
import { SharedData, UserModel } from '@/types';
import { PaginationProps } from '@/types/paginate';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexProps {
    users: PaginationProps<UserModel>;
}

export default function UsersIndex() {
    const { users } = usePage<SharedData & IndexProps>().props;

    return (
        <AppLayout>
            <Head title="Liste des utilisateurs" />
            <div className="container-sidebar">
                <Heading title="Liste des utilisateurs">Consultez et gérez l'ensemble des utilisateurs de l'établissement.</Heading>
                <div className="mb-4 flex items-center justify-between">
                    <FilterInput
                        availableSorts={[
                            { label: 'Nom', value: 'name' },
                            { label: 'Email vérifié', value: 'email_verified_at' },
                            { label: 'Adresse e-mail', value: 'email' },
                            { label: 'Mise à jour', value: 'updated_at' },
                        ]}
                        url={route('#user.index')}
                    />
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('#user.create')}>
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>
                <UsersTable users={users.data} />
                <Pagination items={users} />
            </div>
        </AppLayout>
    );
}
