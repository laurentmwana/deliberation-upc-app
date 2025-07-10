import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { SelectMultiple } from '@/components/ui/select-multiple';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { DepartmentModel, TeacherModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type TeacherFormProps = {
    teacher?: TeacherModel;
};

type TeacherFormData = {
    id: number | null;
    name: string;
    firstname: string;
    gender: string;
    phone: string;
    departments: string[];
};

export const TeacherForm: React.FC<TeacherFormProps> = ({ teacher }) => {
    const { fetchData: fetchDepartments, isPending: isPendingDepartment } = useFetch<DepartmentModel[]>(route('^department.index'));
    const { fetchData: fetchGenders, isPending: isPendingGenders } = useFetch<string[]>(route('^gender.index'));

    const teacherDepartments = teacher?.departments?.map((d) => d.id.toString()) ?? [];

    const { processing, setData, data, errors, post, put } = useForm<TeacherFormData>({
        id: teacher?.id || null,
        name: teacher?.name || '',
        firstname: teacher?.firstname || '',
        phone: teacher?.phone || '',
        gender: teacher?.gender || '',
        departments: teacherDepartments,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        return teacher
            ? put(route('#teacher.update', teacher.id), { preserveScroll: true })
            : post(route('#teacher.store'), { preserveScroll: true });
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        autoFocus
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ex : Mukeba"
                        aria-invalid={!!errors.name}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="firstname">Postnom</Label>
                    <Input
                        id="firstname"
                        required
                        value={data.firstname}
                        onChange={(e) => setData('firstname', e.target.value)}
                        placeholder="Ex : Laurent"
                        aria-invalid={!!errors.firstname}
                    />
                    <InputError message={errors.firstname} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <PhoneInput
                        value={data.phone}
                        placeholder="Ex : +243812345678"
                        aria-invalid={!!errors.phone}
                        onChangeValue={($_1, $_2, fullNumber) => setData('phone', fullNumber)}
                    />
                    <InputError message={errors.phone} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="gender">Genre</Label>
                    <SelectSingle
                        isPending={isPendingGenders}
                        value={data.gender}
                        options={fetchGenders?.map((v) => ({ label: v, value: v })) ?? []}
                        placeholder="Sélectionner un genre"
                        onChange={(v) => setData('gender', v)}
                    />
                    <InputError message={errors.gender} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="departments">Départements de rattachement</Label>
                    <SelectMultiple
                        isPending={isPendingDepartment}
                        values={data.departments}
                        options={fetchDepartments?.map((d) => ({ label: d.name, value: d.id.toString() })) ?? []}
                        placeholder="Sélectionner un ou plusieurs départements"
                        onChange={(ids) => setData('departments', ids)}
                    />
                    <InputError message={errors.departments} />
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={processing}
                        aria-disabled={processing}
                        className="flex items-center justify-center gap-2"
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
