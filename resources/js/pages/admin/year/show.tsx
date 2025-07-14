import { Heading } from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { YearDetail } from '@/shared/year/year-details';
import { SharedData } from '@/types';
import { YearModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

interface ShowProps {
    year: YearModel;
}

export default function Show() {
    const { year } = usePage<SharedData & ShowProps>().props;

    return (
        <AppLayout>
            <Head title={`Année académique ${year.name}`} />
            <div className="container-sidebar">
                <Heading title={`Année académique ${year.name}`}>Consultez les informations détaillées de cette année académique.</Heading>

                <YearDetail year={year} />
            </div>
        </AppLayout>
    );
}
