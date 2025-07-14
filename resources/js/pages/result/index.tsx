import { Heading } from '@/components/heading';
import { ToBack } from '@/components/to-back';
import { FilterInput } from '@/components/ui/filter-input';
import { Pagination } from '@/components/ui/pagination';
import { BaseLayout } from '@/layouts/base-layout';
import { ResultTable } from '@/shared/result/results-table';
import type { SharedData } from '@/types';
import { ResultModel, StudentModel } from '@/types/model';
import { PaginationProps } from '@/types/paginate';
import { Head, usePage } from '@inertiajs/react';

type IndexProps = {
    student?: StudentModel;
    results?: PaginationProps<ResultModel>;
};

export default function Index() {
    const { student, results } = usePage<SharedData & IndexProps>().props;

    return (
        <BaseLayout>
            <Head title="Mes résultats" />

            <div className="py-12">
                <div className="mb-4">
                    <ToBack url={route('home')} />
                </div>
                <Heading title="Mes résultats">Voici les résultats de l'étudiant.</Heading>

                <div className="mb-4">
                    <FilterInput
                        availableSorts={[
                            { label: 'Date de création', value: 'created_at' },
                            { label: 'Mise à jour', value: 'updated_at' },
                        ]}
                        url={route('result.index')}
                    />
                </div>

                <div>
                    <ResultTable results={results?.data ?? []} />
                    {results && <Pagination items={results} />}
                </div>
            </div>
        </BaseLayout>
    );
}
