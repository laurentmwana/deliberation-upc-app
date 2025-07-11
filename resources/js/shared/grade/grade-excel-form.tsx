import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { EXCEL_ENUM } from '@/constants/enum';
import { useFetch } from '@/hooks/use-fetch';
import { CourseModel, LevelModel, YearModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type GradeExcelFormData = {
    level_id: number;
    course_id: number;
    year_id: number;
    mode: string;
    file?: File | null;
};

export const GradeExcelForm: React.FC = () => {
    const { fetchData: levels = null, isPending: isLoadingLevels } = useFetch<LevelModel[] | null>(route('^level.course-student'));
    const { fetchData: years = [], isPending: isLoadingYears } = useFetch<YearModel[]>(route('^year.index', { closed: false }));

    const [courses, setCourses] = useState<CourseModel[]>([]);
    const { processing, setData, data, errors, post } = useForm<GradeExcelFormData>({
        level_id: 0,
        course_id: 0,
        year_id: 0,
        mode: '',
        file: null,
    });

    useEffect(() => {
        if (Array.isArray(levels) && data.level_id > 0) {
            const selectedLevel = levels.find((l) => l.id === data.level_id);
            const levelCourses = selectedLevel?.courses ?? [];
            setCourses(levelCourses);

            if (!levelCourses.some((c) => c.id === data.course_id)) {
                setData('course_id', 0);
            }
        } else {
            setCourses([]);
            setData('course_id', 0);
        }
    }, [data.level_id, levels]);

    const handleImport = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('#grade.excel.import'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const exportUrl = route('#grade.excel.export', {
        year_id: data.year_id,
        level_id: data.level_id,
        course_id: data.course_id,
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Année académique */}
            <div className="grid gap-2">
                <Label htmlFor="year_id">Année académique</Label>
                <SelectSingle
                    isPending={isLoadingYears}
                    value={data.year_id.toString()}
                    options={years?.map((y) => ({ label: y.name, value: y.id.toString() })) ?? []}
                    placeholder="Sélectionner une année"
                    onChange={(v) => setData('year_id', parseInt(v))}
                    disabled={isLoadingYears}
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
                        })) || []
                    }
                    placeholder="Sélectionner une promotion"
                    onChange={(v) => setData('level_id', parseInt(v))}
                    disabled={isLoadingLevels}
                />
                <InputError message={errors.level_id} />
            </div>

            {/* Cours */}
            <div className="grid gap-2">
                <Label htmlFor="course_id">Cours</Label>
                <SelectSingle
                    isPending={isLoadingLevels}
                    value={data.course_id.toString()}
                    options={courses.map((c) => ({ label: c.name, value: c.id.toString() }))}
                    placeholder="Sélectionner un cours"
                    onChange={(v) => setData('course_id', parseInt(v))}
                    disabled={courses.length === 0}
                />
                <InputError message={errors.course_id} />
            </div>

            {/* Mode */}
            <div className="grid gap-2">
                <Label htmlFor="mode">Mode</Label>
                <SelectSingle
                    value={data.mode}
                    options={[
                        { label: 'Importer les notes', value: EXCEL_ENUM.import },
                        { label: 'Exporter la fiche', value: EXCEL_ENUM.export },
                    ]}
                    placeholder="Sélectionner un mode"
                    onChange={(v) => setData('mode', v)}
                />
                <InputError message={errors.mode} />
            </div>

            {/* Fichier Excel si import */}
            {data.mode === EXCEL_ENUM.import && (
                <form onSubmit={handleImport} className="grid gap-2" encType="multipart/form-data" noValidate>
                    <Label htmlFor="file">Fichier Excel</Label>
                    <Input id="file" type="file" accept=".xlsx,.xls" onChange={(e) => setData('file', e.target.files?.[0] ?? null)} required />
                    <InputError message={errors.file} />
                    <div>
                        <Button type="submit" disabled={processing || !data.file || !data.year_id || !data.level_id || !data.course_id}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Importer
                        </Button>
                    </div>
                </form>
            )}

            {/* Bouton d'export */}
            {data.mode === EXCEL_ENUM.export && (
                <div className="grid gap-2">
                    <a href={exportUrl} target="_blank" rel="noopener noreferrer">
                        <Button disabled={!data.year_id || !data.level_id || !data.course_id}>Exporter</Button>
                    </a>
                </div>
            )}
        </div>
    );
};
