import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { CourseModel, LevelModel, SemesterModel, TeacherModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useEffect, useState } from 'react';

type CourseFormProps = {
    course?: CourseModel;
};

type CourseFormData = {
    id: number | null;
    name: string;
    alias: string;
    credits: number;
    semester_id: number;
    teacher_id: number;
    level_id: number;
};

export const CourseForm: React.FC<CourseFormProps> = ({ course }) => {
    const { fetchData: levels = [], isPending: isLoadingLevels } = useFetch<LevelModel[]>(route('^level-with-semester.index'));

    const { fetchData: teachers = [], isPending: isLoadingTeachers } = useFetch<TeacherModel[]>(route('^teacher.index'));

    const [semesters, setSemesters] = useState<SemesterModel[]>([]);
    const [isLoadingSemesters, setIsLoadingSemesters] = useState(false);

    const { processing, setData, data, errors, post, put, reset } = useForm<CourseFormData>({
        id: course?.id || null,
        name: course?.name || '',
        alias: course?.alias || '',
        credits: course?.credits || 2,
        semester_id: course?.semester_id || 0,
        teacher_id: course?.teacher_id || 0,
        level_id: course?.level_id || 0,
    });

    useEffect(() => {
        if (data.level_id > 0 && levels && levels.length > 0) {
            setIsLoadingSemesters(true);
            const selectedLevel = levels.find((l) => l.id === data.level_id);

            if (selectedLevel?.semesters) {
                setSemesters(selectedLevel.semesters);

                if (data.semester_id > 0 && !selectedLevel.semesters.some((s) => s.id === data.semester_id)) {
                    setData('semester_id', 0);
                }

                if (!course && data.semester_id === 0 && selectedLevel.semesters.length > 0) {
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

        const action = course
            ? put(route('#course.update', course.id), {
                  preserveScroll: true,
              })
            : post(route('#course.store'), {
                  preserveScroll: true,
                  onSuccess: () => {
                      reset();
                  },
              });

        return action;
    };

    const handleLevelChange = (value: string) => {
        const levelId = parseInt(value);
        if (!isNaN(levelId)) {
            setData('level_id', levelId);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6">
                {/* Nom du cours */}
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom du cours</Label>
                    <Input
                        id="name"
                        autoFocus
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ex: Mathématiques Appliquées"
                        aria-invalid={!!errors.name}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="alias">Code du cours</Label>
                    <Input
                        id="alias"
                        autoFocus
                        required
                        value={data.alias}
                        onChange={(e) => setData('alias', e.target.value)}
                        placeholder="Ex: Math"
                        aria-invalid={!!errors.alias}
                        disabled={processing}
                    />
                    <InputError message={errors.alias} />
                </div>

                {/* Crédits */}
                <div className="grid gap-2">
                    <Label htmlFor="credits">Crédits</Label>
                    <Input
                        id="credits"
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={data.credits}
                        onChange={(e) => setData('credits', parseInt(e.target.value) || 1)}
                        placeholder="Ex: 3"
                        aria-invalid={!!errors.credits}
                        disabled={processing}
                    />
                    <InputError message={errors.credits} />
                </div>

                {/* Enseignant */}
                <div className="grid gap-2">
                    <Label htmlFor="teacher_id">Professeur</Label>
                    <SelectSingle
                        isPending={isLoadingTeachers}
                        value={data.teacher_id.toString()}
                        options={
                            teachers?.map((t) => ({
                                label: `${t.name} ${t.firstname}`,
                                value: t.id.toString(),
                            })) ?? []
                        }
                        placeholder="Sélectionner un professeur"
                        onChange={(v) => setData('teacher_id', parseInt(v))}
                        disabled={processing || isLoadingTeachers}
                        aria-invalid={!!errors.teacher_id}
                    />
                    <InputError message={errors.teacher_id} />
                </div>

                {/* Niveau */}
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
                        placeholder="Sélectionner un niveau"
                        onChange={handleLevelChange}
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

                {/* Bouton de soumission */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={processing}
                        aria-disabled={processing}
                        className="flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {course ? 'Mettre à jour' : 'Créer'} le cours
                    </Button>
                </div>
            </div>
        </form>
    );
};
