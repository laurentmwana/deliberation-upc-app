import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MarkdownTextarea } from '@/components/ui/markdown-textarea';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { DeliberationModel, LevelModel, SemesterModel, YearModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useEffect, useState } from 'react';

type DeliberationFormProps = {
    deliberation?: DeliberationModel;
};

type DeliberationFormData = {
    id: number | null;
    description: string;
    level_id: number;
    semester_id: number;
    year_id: number;
};

export const DeliberationForm: React.FC<DeliberationFormProps> = ({ deliberation }) => {
    const { fetchData: levels = [], isPending: isLoadingLevels } = useFetch<LevelModel[]>(route('^level-with-semester.index'));
    const { fetchData: years = [], isPending: isLoadingYears } = useFetch<YearModel[]>(route('^year.index'));

    const [semesters, setSemesters] = useState<SemesterModel[]>([]);
    const [isLoadingSemesters, setIsLoadingSemesters] = useState(false);

    const { processing, setData, data, errors, post, put, reset } = useForm<DeliberationFormData>({
        id: deliberation?.id || null,
        description: deliberation?.description || '',
        level_id: deliberation?.level_id || 0,
        semester_id: deliberation?.semester_id || 0,
        year_id: deliberation?.year_id || 0,
    });

    useEffect(() => {
        if (data.level_id > 0 && levels && levels.length > 0) {
            setIsLoadingSemesters(true);
            const selectedLevel = levels?.find((l) => l.id === data.level_id);

            if (selectedLevel?.semesters) {
                setSemesters(selectedLevel.semesters);

                if (data.semester_id > 0 && !selectedLevel.semesters.some((s) => s.id === data.semester_id)) {
                    setData('semester_id', 0);
                }

                if (!deliberation && data.semester_id === 0 && selectedLevel.semesters.length > 0) {
                    setData('semester_id', selectedLevel.semesters[0].id);
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

        const action = deliberation
            ? put(route('#deliberation.update', deliberation.id), { preserveScroll: true })
            : post(route('#deliberation.store'), {
                  preserveScroll: true,
                  onSuccess: () => reset(),
              });

        return action;
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6">
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
                        placeholder="Sélectionner une année"
                        onChange={(v) => setData('year_id', parseInt(v))}
                        disabled={processing || isLoadingYears}
                        aria-invalid={!!errors.year_id}
                    />
                    <InputError message={errors.year_id} />
                </div>

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

                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Description (optionnelle)</Label>
                    <MarkdownTextarea
                        contentType={deliberation ? 'html' : 'markdown'}
                        id="description"
                        defaultValue={data.description}
                        onChange={(v) => setData('description', v)}
                        placeholder="Ex: Délibération du 1er semestre pour la L2"
                        disabled={processing}
                        aria-invalid={!!errors.description}
                    />
                    <InputError message={errors.description} />
                </div>

                {/* Bouton de soumission */}
                <div className="pt-2">
                    <Button type="submit" disabled={processing} className="flex w-full items-center justify-center gap-2 sm:w-auto">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {deliberation ? 'Mettre à jour' : 'Créer'} la délibération
                    </Button>
                </div>
            </div>
        </form>
    );
};
