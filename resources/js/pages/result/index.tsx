import { Heading } from '@/components/heading';
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
                <Heading title="Mes résultats">Voici les résultats de l'étudiant.</Heading>

                <div>
                    <ResultTable results={results?.data ?? []} />
                    {results && <Pagination items={results} />}
                </div>
            </div>
        </BaseLayout>
    );
}
