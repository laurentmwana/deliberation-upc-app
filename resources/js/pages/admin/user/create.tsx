import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { UserForm } from '@/shared/user/user-form';
import { Head } from '@inertiajs/react';

export default function CreateUserPage() {
    return (
        <AppLayout>
            <Head title="Créer un utilisateur" />
            <main className="container-sidebar space-y-6">
                <Heading title="Créer un utilisateur">Ajoutez un nouvel utilisateur et associez-le à un étudiant si besoin.</Heading>

                <section className="max-w-2xl">
                    <UserForm />
                </section>
            </main>
        </AppLayout>
    );
}
