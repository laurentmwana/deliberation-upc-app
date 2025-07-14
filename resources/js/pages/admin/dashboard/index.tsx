import { Heading } from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Bell, MessageSquare, TrendingUp, Users } from 'lucide-react';

interface IndexProps {
    countFaculties: number;
    countDepartments: number;
    countStudents: number;
}

export default function Dashboard() {
    const { countDepartments, countFaculties, countStudents } = usePage<SharedData & IndexProps>().props;

    const stats = [
        {
            title: 'Facultés',
            value: countFaculties,
            description: 'Facultés actives',
            icon: Users,
            trend: '+12%',
        },
        {
            title: 'Départements',
            value: countDepartments,
            description: 'Départements enregistrés',
            icon: Bell,
            trend: '+8%',
        },
        {
            title: 'Étudiants',
            value: countStudents,
            description: 'Étudiants inscrits',
            icon: MessageSquare,
            trend: '+15%',
        },
    ];

    return (
        <AppLayout>
            <Head title="Tableau de bord" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <Heading title="Tableau de bord">
                    Suivez en temps réel l’activité de votre établissement, les statistiques clés et accédez rapidement aux fonctions essentielles."
                </Heading>

                {/* Statistiques */}
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className="relative">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                    <div className="rounded-full bg-muted p-2">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            <TrendingUp className="mr-1 h-3 w-3" />
                                            {stat.trend}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
