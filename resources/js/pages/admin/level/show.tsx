import { Heading } from '@/components/heading';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ago } from '@/lib/date-time';
import { LevelDetail } from '@/shared/level/level-details';
import { SharedData } from '@/types';
import { LevelModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    level: LevelModel;
}

export default function Show() {
    const { level } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title="Informations sur la promotion" />
            <div className="container-sidebar space-y-6">
                <Heading title="Détails de la promotion">
                    Voici les informations détaillées concernant la promotion <strong>{level.name}</strong>.
                </Heading>

                <LevelDetail level={level} />
            </div>
        </AppLayout>
    );
}
