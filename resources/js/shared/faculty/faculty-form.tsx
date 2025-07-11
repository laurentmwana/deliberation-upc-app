import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FacultyModel } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type FacultyFormProps = {
    faculty?: FacultyModel;
};

type FacultyFormData = {
    id: number | null;
    name: string;
};

export const FacultyForm: React.FC<FacultyFormProps> = ({ faculty }) => {
    const { processing, setData, data, errors, post, put } = useForm<FacultyFormData>({
        id: faculty?.id || null,
        name: faculty?.name || '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        faculty
            ? put(route('#faculty.update', faculty.id), {
                  preserveScroll: true,
              })
            : post(route('#faculty.store'), {
                  preserveScroll: true,
              });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom de la faculté</Label>
                    <Textarea
                        id="name"
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        required
                        placeholder="Entrez le nom de la faculté"
                    />
                    <InputError message={errors.name} />
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
