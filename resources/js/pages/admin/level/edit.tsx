import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { LevelForm } from '@/shared/level/level-form';
import { LevelModel } from '@/types/model';
import { Head } from '@inertiajs/react';

type EditProps = { level: LevelModel };

export default function Edit({ level }: EditProps) {
    return (
        <AppLayout>
            <Head title="Modifier une promotion" />
            <div className="container-sidebar space-y-6">
                <Heading title="Modifier une promotion">
                    Modifiez les informations de la promotion <strong>{level.name}</strong> afin de refléter les changements nécessaires.
                </Heading>

                <div className="max-w-2xl">
                    <LevelForm level={level} />
                </div>
            </div>
        </AppLayout>
    );
}
