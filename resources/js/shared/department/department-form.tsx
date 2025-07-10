import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/use-fetch';
import { DepartmentModel, FacultyModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type DepartmentFormProps = {
    department?: DepartmentModel;
};

type DepartmentFormData = {
    id: number | null;
    name: string;
    alias: string;
    faculty_id: number;
};

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ department }) => {
    const { fetchData, isPending } = useFetch<FacultyModel[]>(route('^faculty.index'));

    const { processing, setData, data, errors, post, put } = useForm<DepartmentFormData>({
        id: department?.id || null,
        name: department?.name || '',
        alias: department?.alias || '',
        faculty_id: department?.faculty_id || 0,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        department
            ? put(route('#department.update', department.id), {
                  preserveScroll: true,
              })
            : post(route('#department.store'), {
                  preserveScroll: true,
              });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom du département</Label>
                    <Textarea
                        id="name"
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        required
                        placeholder="Ex: Département d'Informatique"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="alias">Code du département</Label>
                    <Textarea
                        id="alias"
                        value={data.alias}
                        onChange={(e) => setData('alias', e.target.value)}
                        aria-invalid={!!errors.alias}
                        required
                        placeholder="Ex: INFO"
                    />
                    <InputError message={errors.alias} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="faculty_id">Faculté de rattachement</Label>
                    <SelectSingle
                        isPending={isPending}
                        value={data.faculty_id.toString()}
                        options={
                            fetchData
                                ? fetchData.map((f) => {
                                      return {
                                          label: f.name,
                                          value: f.id.toString(),
                                      };
                                  })
                                : []
                        }
                        placeholder="Sélectionner une faculté"
                        onChange={(v) => setData('faculty_id', parseInt(v))}
                    />
                    <InputError message={errors.faculty_id} />
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
