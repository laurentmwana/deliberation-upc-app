import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { CourseModel, DepartmentModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type CourseFormProps = {
    course?: CourseModel;
};

type CourseFormData = {
    id: number | null;
    name: string;
    credits: number;
    semester: string;
    teacher_id: number;
    level_id: number;
};

export const CourseForm: React.FC<CourseFormProps> = ({ course }) => {
    const { fetchData: fetchDepartments, isPending: isPendingDepartment } = useFetch<DepartmentModel[]>(route('^department.index'));
    const { fetchData: fetchSemesters, isPending: isPendingGenders } = useFetch<string[]>(route('^enum.gender.index'));
    const { fetchData: fetchGenders, isPending: isPendingGenders } = useFetch<string[]>(route('^enum.gender.index'));

    const { processing, setData, data, errors, post, put } = useForm<CourseFormData>({
        id: course?.id || null,
        name: course?.name || '',
        semester: course?.semester || '',
        credits: course?.credits || 1,
        teacher_id: course?.teacher_id || 0,
        level_id: course?.level_id || 0,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        return course ? put(route('#course.update', course.id), { preserveScroll: true }) : post(route('#course.store'), { preserveScroll: true });
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

                <div className="pt-2">
                    <Button type="submit" disabled={processing} aria-disabled={processing} className="flex items-center justify-center gap-2">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
