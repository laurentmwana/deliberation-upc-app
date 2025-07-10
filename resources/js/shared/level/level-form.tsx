import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { DepartmentModel, LevelModel, OrientationModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useCallback, useEffect, useState } from 'react';

type LevelFormProps = {
    level?: LevelModel;
};

type LevelFormData = {
    id: number | null;
    name: string;
    alias: string;
    department_id: number;
    orientation_id: number | null;
};

export const LevelForm: React.FC<LevelFormProps> = ({ level }) => {
    const {
        fetchData: departments = [],
        isPending: isLoadingDepartments,
        error: departmentsError,
    } = useFetch<DepartmentModel[]>(route('^department.index'));

    const [orientations, setOrientations] = useState<OrientationModel[]>([]);
    const [isLoadingOrientations, setIsLoadingOrientations] = useState(false);
    const [orientationError, setOrientationError] = useState<string | null>(null);

    const { processing, setData, data, errors, post, put, reset } = useForm<LevelFormData>({
        id: level?.id || null,
        name: level?.name || '',
        alias: level?.alias || '',
        department_id: level?.department_id || 0,
        orientation_id: level?.orientation_id || null,
    });


    console.log(data)

    const fetchOrientations = useCallback(
        async (departmentId: number) => {
            if (!departmentId) {
                setOrientations([]);
                setData('orientation_id', null);
                return;
            }

            setIsLoadingOrientations(true);
            setOrientationError(null);

            try {
                const response = await fetch(route('^orientation.index', { department: departmentId }));
                if (!response.ok) throw new Error('Erreur de chargement des orientations');

                const dataResponse: OrientationModel[] = await response.json();
                setOrientations(dataResponse);

                if (data.orientation_id && !dataResponse.some((o) => o.id === data.id)) {
                    setData('orientation_id', null);
                }
            } catch (error) {
                setOrientations([]);
                setData('orientation_id', null);
                setOrientationError('Impossible de charger les orientations');
                console.error('Fetch orientations error:', error);
            } finally {
                setIsLoadingOrientations(false);
            }
        },
        [setData],
    );

    useEffect(() => {
        if (data.department_id) {
            fetchOrientations(data.department_id);
        }
    }, [data.department_id, fetchOrientations]);

    const handleDepartmentChange = (value: string) => {
        const departmentId = parseInt(value, 10);
        if (!isNaN(departmentId)) {
            setData({
                ...data,
                department_id: departmentId,
                orientation_id: null,
            });
        }
    };

    const handleOrientationChange = (value: string) => {
        const orientationId = parseInt(value, 10);
        if (!isNaN(orientationId)) {
            setData('orientation_id', orientationId);
        } else {
            setData('orientation_id', null);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const action = level
            ? put(route('#level.update', level.id), {
                  preserveScroll: true,
              })
            : post(route('#level.store'), {
                  preserveScroll: true,
                  onSuccess: () => {
                      reset();
                  },
              });

        return action;
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6">
                {/* Nom de la promotion */}
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
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
                </div>

                {/* Code de la promotion */}
                <div className="grid gap-2">
                    <Label htmlFor="alias">Code de la promotion</Label>
                    <Input
                        id="alias"
                        required
                        value={data.alias}
                        onChange={(e) => setData('alias', e.target.value)}
                        placeholder="Ex: L1"
                        aria-invalid={!!errors.alias}
                        disabled={processing}
                    />
                    <InputError message={errors.alias} />
                </div>

                {/* Département de rattachement */}
                <div className="grid gap-2">
                    <Label htmlFor="department_id">Département de rattachement</Label>
                    <SelectSingle
                        isPending={isLoadingDepartments}
                        value={data.department_id ? data.department_id.toString() : ''}
                        options={
                            departments?.map((d) => ({
                                label: d.name,
                                value: d.id.toString(),
                            })) ?? []
                        }
                        placeholder={
                            isLoadingDepartments ? 'Chargement...' : departmentsError ? 'Erreur de chargement' : 'Sélectionner un département'
                        }
                        onChange={handleDepartmentChange}
                        disabled={processing || isLoadingDepartments || !!departmentsError}
                        aria-invalid={!!errors.department_id}
                    />
                    <InputError message={errors.department_id} />
                    {departmentsError && <InputError message="Impossible de charger les départements" />}
                </div>

                {/* Orientation ou Spécialisation */}
                {(orientations.length > 0 || isLoadingOrientations) && (
                    <div className="grid gap-2">
                        <Label htmlFor="orientation_id">Orientation ou Spécialisation</Label>
                        <SelectSingle
                            isPending={isLoadingOrientations}
                            value={data.orientation_id?.toString() ?? ''}
                            options={orientations.map((o) => ({
                                label: o.name,
                                value: o.id.toString(),
                            }))}
                            placeholder={isLoadingOrientations ? 'Chargement...' : 'Optionnel - Sélectionner une orientation'}
                            onChange={handleOrientationChange}
                            disabled={processing || isLoadingOrientations}
                            aria-invalid={!!errors.orientation_id}
                        />
                        <InputError message={errors.orientation_id} />
                        {orientationError && <InputError message={orientationError} />}
                    </div>
                )}

                {/* Bouton de soumission */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={processing || isLoadingDepartments}
                        aria-disabled={processing || isLoadingDepartments}
                        className="flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {level ? 'Mettre à jour' : 'Créer'} la promotion
                    </Button>
                </div>
            </div>
        </form>
    );
};
