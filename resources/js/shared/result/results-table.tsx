import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { ResultModel } from '@/types/model';
import { Download, FileText } from 'lucide-react';
import React from 'react';

type ResultTableProps = {
    results: ResultModel[];
};

export const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
    if (results.length === 0) {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Aucun résultat disponible</h3>
                </div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Promotion</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead>Année</TableHead>
                    <TableHead>Décision</TableHead>
                    <TableHead>Pourcentage</TableHead>
                    <TableHead>Créé le</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((r) => (
                    <TableRow key={r.id}>
                        <TableCell>{excerpt(r.deliberation?.level?.name ?? '—', 40)}</TableCell>
                        <TableCell>{excerpt(r.deliberation?.semester?.full_name ?? '—', 40)}</TableCell>
                        <TableCell>{excerpt(r.deliberation?.year?.name ?? '—', 10)}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{r.decision ?? '—'}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="secondary">{r.percent ? `${r.percent.toFixed(2)}%` : '—'}</Badge>
                        </TableCell>
                        <TableCell>{ago(r.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex flex-wrap items-center gap-2">
                                <Button variant="secondary" size="sm" asChild>
                                    <a href={route('result.download', { id: r.id })}>
                                        <Download size={14} className="mr-1" />
                                        Télécharger
                                    </a>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
