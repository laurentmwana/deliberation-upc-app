import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { UserModel } from '@/types';
import { StudentModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type UserFormProps = {
    user?: UserModel;
};

type UserFormData = {
    id: number | null;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    student_id: number;
};

export const UserForm: React.FC<UserFormProps> = ({ user }) => {
    const { fetchData: students = [], isPending: isLoadingStudents } = useFetch<StudentModel[]>(route('^student.index'));

    const { processing, setData, data, errors, post, put, reset } = useForm<UserFormData>({
        id: user?.id || null,
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        student_id: user?.student.id ?? 0,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            preserveScroll: true,
            onSuccess: () => {
                // Réinitialise les champs sensibles
                reset('password', 'password_confirmation');
            },
        };

        user ? put(route('#user.update', user.id), payload) : post(route('#user.store'), payload);
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Entrez le nom complet"
                        aria-invalid={!!errors.name}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="Entrez l'adresse email"
                        aria-invalid={!!errors.email}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Laissez vide pour ne pas modifier"
                        aria-invalid={!!errors.password}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirmation du mot de passe</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        aria-invalid={!!errors.password_confirmation}
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="student_id">Étudiant lié (facultatif)</Label>
                    <SelectSingle
                        isPending={isLoadingStudents}
                        value={data.student_id?.toString() ?? ''}
                        options={
                            students?.map((student) => ({
                                label: `${student.firstname} ${student.name}`,
                                value: student.id.toString(),
                            })) ?? []
                        }
                        placeholder="Sélectionner un étudiant"
                        onChange={(v) => setData('student_id', parseInt(v))}
                    />
                    <InputError message={errors.student_id} />
                </div>

                <div>
                    <Button type="submit" className="mt-4 flex items-center justify-center gap-2" disabled={processing} aria-disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
