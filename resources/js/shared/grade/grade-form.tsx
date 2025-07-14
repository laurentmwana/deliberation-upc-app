import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { CourseModel, GradeModel, LevelModel, StudentModel, YearModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useEffect, useState } from 'react';

type GradeFormProps = {
    grade?: GradeModel;
};

type GradeFormData = {
    id: number | null;
    level_id: number;
    course_id: number;
    student_id: number;
    year_id: number;
    score: number;
};

export const GradeForm: React.FC<GradeFormProps> = ({ grade }) => {
    const { fetchData: levels, isPending: isLoadingLevels } = useFetch<LevelModel[]>(route('^level.course-student'));
    const { fetchData: years, isPending: isLoadingYears } = useFetch<YearModel[]>(route('^year.index', { closed: false }));

    const [students, setStudents] = useState<StudentModel[]>([]);
    const [courses, setCourses] = useState<CourseModel[]>([]);

    const { processing, setData, data, errors, post, put } = useForm<GradeFormData>({
        id: grade?.id || null,
        level_id: grade?.level_id || 0,
        course_id: grade?.course_id || 0,
        student_id: grade?.student_id || 0,
        year_id: grade?.year_id || 0,
        score: grade?.score || 0,
    });

    useEffect(() => {
        if (levels && data.level_id) {
            const selectedLevel = levels.find((l) => l.id === data.level_id);
            setStudents(selectedLevel?.students ?? []);
            setCourses(selectedLevel?.courses ?? []);
            if (!selectedLevel?.students.find((s) => s.id === data.student_id)) {
                setData('student_id', 0);
            }
            if (!selectedLevel?.courses.find((c) => c.id === data.course_id)) {
                setData('course_id', 0);
            }
        } else {
            setStudents([]);
            setCourses([]);
            setData('student_id', 0);
            setData('course_id', 0);
        }
    }, [data.level_id, levels]);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (grade) {
            put(route('#grade.update', grade.id), { preserveScroll: true });
        } else {
            post(route('#grade.store'), { preserveScroll: true });
        }
    };

    // 🚫 Si l'année est clôturée, ne pas afficher le formulaire
    if (grade?.year?.is_closed) {
        return (
            <div className="p-4 text-center bg-red-50 text-red-700 rounded-md border border-red-200">
                L’année académique sélectionnée est clôturée. Vous ne pouvez plus modifier cette note.
            </div>
        );
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="year_id">Année académique</Label>
                    <SelectSingle
                        isPending={isLoadingYears}
                        value={data.year_id.toString()}
                        options={years?.map((y) => ({ label: y.name, value: y.id.toString() })) ?? []}
                        placeholder="Sélectionner une année"
                        onChange={(v) => setData('year_id', parseInt(v))}
                    />
                    <InputError message={errors.year_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="level_id">Promotion</Label>
                    <SelectSingle
                        isPending={isLoadingLevels}
                        value={data.level_id.toString()}
                        options={levels?.map((l) => ({ label: l.name, value: l.id.toString() })) ?? []}
                        placeholder="Sélectionner une promotion"
                        onChange={(v) => setData('level_id', parseInt(v))}
                    />
                    <InputError message={errors.level_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="student_id">Étudiant</Label>
                    <SelectSingle
                        isPending={isLoadingLevels}
                        value={data.student_id.toString()}
                        options={students.map((s) => ({ label: `${s.firstname} ${s.name}`, value: s.id.toString() }))}
                        placeholder="Sélectionner un étudiant"
                        onChange={(v) => setData('student_id', parseInt(v))}
                    />
                    <InputError message={errors.student_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="course_id">Cours</Label>
                    <SelectSingle
                        isPending={isLoadingLevels}
                        value={data.course_id.toString()}
                        options={courses.map((c) => ({ label: c.name, value: c.id.toString() }))}
                        placeholder="Sélectionner un cours"
                        onChange={(v) => setData('course_id', parseInt(v))}
                    />
                    <InputError message={errors.course_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="score">Note /20</Label>
                    <Input
                        type="number"
                        id="score"
                        min={0}
                        max={20}
                        required
                        value={data.score}
                        onChange={(e) => setData('score', parseFloat(e.target.value))}
                        placeholder="Ex: 12.5"
                        aria-invalid={!!errors.score}
                    />
                    <InputError message={errors.score} />
                </div>

                <div className="pt-2">
                    <Button type="submit" disabled={processing} aria-disabled={processing} className="flex items-center gap-2">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
