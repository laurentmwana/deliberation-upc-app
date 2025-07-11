import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { UserForm } from '@/shared/user/user-form';
import { UserModel } from '@/types';
import { Head } from '@inertiajs/react';

type EditProps = { user: UserModel };

export default function EditUser({ user }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modifier un utilisateur" />
            <div className="container-sidebar">
                <Heading title="Modifier l'utilisateur">
                    Modifiez les informations de cet utilisateur pour mettre à jour son profil.
                </Heading>

                <div className="max-w-2xl">
                    <UserForm user={user} />
                </div>
            </div>
        </AppLayout>
    );
}
