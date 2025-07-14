import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/use-fetch';
import { DepartmentModel, OrientationModel } from '@/types/model';

type OrientationFormProps = {
    orientation?: OrientationModel;
};

type OrientationFormData = {
    id: number | null;
    name: string;
    department_id: number;
};

export const OrientationForm: React.FC<OrientationFormProps> = ({ orientation }) => {
    const { fetchData = [], isPending } = useFetch<DepartmentModel[]>(route('^department.index'));

    const { processing, setData, data, errors, post, put } = useForm<OrientationFormData>({
        id: orientation?.id || null,
        name: orientation?.name || '',
        department_id: orientation?.department_id || 0,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (orientation) {
            put(route('#orientation.update', orientation.id), {
                preserveScroll: true,
            });
        } else {
            post(route('#orientation.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom de l'orientation</Label>
                    <Textarea
                        id="name"
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        required
                        placeholder="Ex: Orientation Réseaux et Télécoms"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="department_id">Département de rattachement</Label>
                    <SelectSingle
                        isPending={isPending}
                        value={data.department_id ? data.department_id.toString() : ''}
                        options={
                            fetchData?.map((dept) => ({
                                label: dept.name,
                                value: dept.id.toString(),
                            })) ?? []
                        }
                        placeholder="Sélectionner un département"
                        onChange={(v) => {
                            const parsed = parseInt(v);
                            if (!isNaN(parsed)) {
                                setData('department_id', parsed);
                            }
                        }}
                    />
                    <InputError message={errors.department_id} />
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
