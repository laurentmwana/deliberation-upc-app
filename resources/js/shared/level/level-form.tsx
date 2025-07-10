import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { DepartmentModel, LevelModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type LevelFormProps = {
    level?: LevelModel;
};

type LevelFormData = {
    id: number | null;
    name: string;
    alias: string;
    department_id: number;
};

export const LevelForm: React.FC<LevelFormProps> = ({ level }) => {
    const { fetchData, isPending } = useFetch<DepartmentModel[]>(route('^department.index'));

    const { processing, setData, data, errors, post, put } = useForm<LevelFormData>({
        id: level?.id || null,
        name: level?.name || '',
        alias: level?.alias || '',
        department_id: level?.department_id || 0,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const action = level
            ? put(route('#level.update', level.id), { preserveScroll: true })
            : post(route('#level.store'), { preserveScroll: true });

        return action;
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom de la promotion</Label>
                    <Input
                        id="name"
                        autoFocus
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ex: Licence 1"
                        aria-invalid={!!errors.name}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="alias">Code de la promotion</Label>
                    <Input
                        id="alias"
                        required
                        value={data.alias}
                        onChange={(e) => setData('alias', e.target.value)}
                        placeholder="Ex: L1"
                        aria-invalid={!!errors.alias}
                    />
                    <InputError message={errors.alias} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="department_id">Département de rattachement</Label>
                    <SelectSingle
                        isPending={isPending}
                        value={data.department_id.toString()}
                        options={
                            fetchData?.map((d) => ({
                                label: d.name,
                                value: d.id.toString(),
                            })) ?? []
                        }
                        placeholder="Sélectionner un département"
                        onChange={(v) => setData('department_id', parseInt(v))}
                    />
                    <InputError message={errors.department_id} />
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
