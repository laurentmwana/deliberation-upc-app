import { Heading } from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { UserDetail } from '@/shared/user/user-details';
import { SharedData, UserModel } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    user: UserModel;
}

export default function ShowUser() {
    const { user } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Utilisateur - ${user.name}`} />
            <div className="container-sidebar">
                <Heading title={`Utilisateur ${user.name}`}>Consultez les informations détaillées de cet utilisateur.</Heading>

                <UserDetail user={user} />
            </div>
        </AppLayout>
    );
}
