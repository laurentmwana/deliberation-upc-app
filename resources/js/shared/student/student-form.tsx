import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { LevelModel, StudentModel, YearModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type StudentFormProps = {
    student?: StudentModel;
};

type StudentFormData = {
    id: number | null;
    name: string;
    firstname: string;
    gender: string;
    birth: string;
    year_id: number;
    level_id: number;
};

export const StudentForm: React.FC<StudentFormProps> = ({ student }) => {
    const { fetchData: levels, isPending: isLoadingLevels } = useFetch<LevelModel[]>(route('^level.index'));
    const { fetchData: years, isPending: isLoadingYears } = useFetch<YearModel[]>(route('^year.index', { closed: false }));

    const { processing, setData, data, errors, post, put } = useForm<StudentFormData>({
        id: student?.id || null,
        name: student?.name || '',
        firstname: student?.firstname || '',
        gender: student?.gender || '',
        birth: student?.birth || '',
        year_id: student?.actual_level?.year_id || 0,
        level_id: student?.actual_level?.level_id || 0,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        student ? put(route('#student.update', student.id), { preserveScroll: true }) : post(route('#student.store'), { preserveScroll: true });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        autoFocus
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ex: Tshibanda"
                        aria-invalid={!!errors.name}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="firstname">Postnom</Label>
                    <Input
                        id="firstname"
                        required
                        value={data.firstname}
                        onChange={(e) => setData('firstname', e.target.value)}
                        placeholder="Ex: Jean"
                        aria-invalid={!!errors.firstname}
                    />
                    <InputError message={errors.firstname} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="gender">Genre</Label>
                    <SelectSingle
                        value={data.gender}
                        options={[
                            { label: 'Masculin', value: 'masculin' },
                            { label: 'Féminin', value: 'féminin' },
                        ]}
                        placeholder="Sélectionner un genre"
                        onChange={(v) => setData('gender', v)}
                    />
                    <InputError message={errors.gender} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="birth">Date de naissance</Label>
                    <Input
                        type="date"
                        id="birth"
                        required
                        value={data.birth}
                        onChange={(e) => setData('birth', e.target.value)}
                        aria-invalid={!!errors.birth}
                    />
                    <InputError message={errors.birth} />
                </div>

                {student && student.actual_level.year.is_closed ? (
                    <p className="text-sm text-muted-foreground">
                        L’année académique est clôturée. Par conséquent, vous ne pouvez plus modifier la promotion ni l’année de cet étudiant, sauf
                        dans le cadre d’un passage à la classe supérieure.
                    </p>
                ) : (
                    <>
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
                            />
                            <InputError message={errors.year_id} />
                        </div>

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
                            />
                            <InputError message={errors.level_id} />
                        </div>
                    </>
                )}

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
