import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSingle } from '@/components/ui/select-single';
import { EXCEL_ENUM } from '@/constants/enum';
import { useFetch } from '@/hooks/use-fetch';
import { LevelModel, YearModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

type StudentExcelFormData = {
    level_id: number;
    year_id: number;
    mode: string;
    file?: File | null;
};

export const StudentExcelForm: React.FC = () => {
    const { fetchData: levels = null, isPending: isLoadingLevels } = useFetch<LevelModel[] | null>(route('^level.index'));
    const { fetchData: years = [], isPending: isLoadingYears } = useFetch<YearModel[]>(route('^year.index', { closed: false }));

    const { processing, setData, data, errors, post } = useForm<StudentExcelFormData>({
        level_id: 0,
        year_id: 0,
        mode: '',
        file: null,
    });

    const handleImport = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('#student.excel.import'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

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

            {/* Mode */}
            <div className="grid gap-2">
                <Label htmlFor="mode">Mode</Label>
                <SelectSingle
                    value={data.mode}
                    options={[
                        { label: 'Importer les étudiants', value: EXCEL_ENUM.import },
                        { label: 'Exporter la liste', value: EXCEL_ENUM.export },
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
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Importer
                        </Button>
                    </div>
                </form>
            )}

            {/* Lien d'export en GET natif */}
            {data.mode === EXCEL_ENUM.export && (
                <form method="GET" action={route('#student.excel.export')} target="_blank" className="grid gap-2">
                    <input type="hidden" name="year_id" value={data.year_id} />
                    <input type="hidden" name="level_id" value={data.level_id} />
                    <div>
                        <Button type="submit" disabled={!data.level_id || !data.year_id}>
                            Exporter
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};
