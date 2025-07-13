import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { LevelModel, SemesterModel, YearModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useEffect, useState } from 'react';

type ResultFormData = {
    level_id: number;
    semester_id: number;
    year_id: number;
};

export const ResultForm: React.FC = () => {
    const { fetchData: levels = [], isPending: isLoadingLevels } = useFetch<LevelModel[]>(route('^level-with-semester.index'));
    const { fetchData: years = [], isPending: isLoadingYears } = useFetch<YearModel[]>(route('^year.index'));

    const [semesters, setSemesters] = useState<SemesterModel[]>([]);
    const [isLoadingSemesters, setIsLoadingSemesters] = useState(false);

    const { processing, setData, data, errors, post } = useForm<ResultFormData>({
        level_id: 0,
        semester_id: 0,
        year_id: 0,
    });

    useEffect(() => {
        if (data.level_id > 0 && levels && levels.length > 0) {
            setIsLoadingSemesters(true);
            const selectedLevel = levels.find((l) => l.id === data.level_id);

            if (selectedLevel?.semesters) {
                setSemesters(selectedLevel.semesters);
                if (!selectedLevel.semesters.some((s) => s.id === data.semester_id)) {
                    setData('semester_id', 0);
                }
            } else {
                setSemesters([]);
                setData('semester_id', 0);
            }

            setIsLoadingSemesters(false);
        } else {
            setSemesters([]);
            setData('semester_id', 0);
        }
    }, [data.level_id, levels]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('#result.published'), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6">
                {/* Promotion */}
                <div className="grid gap-2">
                    <Label htmlFor="level_id">Promotion</Label>
                    <SelectSingle
                        isPending={isLoadingLevels}
                        value={data.level_id.toString()}
                        options={
                            levels?.map((l) => ({
                                label: l.name,
                                value: l.id.toString(),
                            })) ?? []
                        }
                        placeholder="Sélectionner une promotion"
                        onChange={(v) => setData('level_id', parseInt(v))}
                        disabled={processing || isLoadingLevels}
                        aria-invalid={!!errors.level_id}
                    />
                    <InputError message={errors.level_id} />
                </div>

                {/* Semestre */}
                <div className="grid gap-2">
                    <Label htmlFor="semester_id">Semestre</Label>
                    <SelectSingle
                        isPending={isLoadingSemesters}
                        value={data.semester_id > 0 ? data.semester_id.toString() : ''}
                        options={semesters.map((s) => ({
                            label: s.name,
                            value: s.id.toString(),
                        }))}
                        placeholder={
                            isLoadingSemesters
                                ? 'Chargement...'
                                : semesters.length === 0
                                  ? data.level_id > 0
                                      ? 'Aucun semestre disponible'
                                      : "Sélectionnez d'abord une promotion"
                                  : 'Sélectionner un semestre'
                        }
                        onChange={(v) => setData('semester_id', parseInt(v))}
                        disabled={processing || isLoadingSemesters || semesters.length === 0}
                        aria-invalid={!!errors.semester_id}
                    />
                    <InputError message={errors.semester_id} />
                </div>

                {/* Année académique */}
                <div className="grid gap-2">
                    <Label htmlFor="year_id">Année académique</Label>
                    <SelectSingle
                        isPending={isLoadingYears}
                        value={data.year_id.toString()}
                        options={
                            years?.map((y) => ({
                                label: y.name,
                                value: y.id.toString(),
                            })) ?? []
                        }
                        placeholder="Sélectionner une année académique"
                        onChange={(v) => setData('year_id', parseInt(v))}
                        disabled={processing || isLoadingYears}
                        aria-invalid={!!errors.year_id}
                    />
                    <InputError message={errors.year_id} />
                </div>

                {/* Bouton de soumission */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={processing}
                        aria-disabled={processing}
                        className="flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Publier les résultats
                    </Button>
                </div>
            </div>
        </form>
    );
};
