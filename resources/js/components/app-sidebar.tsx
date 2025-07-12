import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ArrowUp10Icon,
    Book,
    Calendar,
    ClipboardList,
    Database,
    File,
    GraduationCap,
    Home,
    Info,
    ListEnd,
    School,
    ScrollText,
    User,
    UserCog,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const mainNavItemsGroup: NavGroup[] = [
        {
            title: 'Application',
            items: [
                {
                    title: 'Accueil',
                    href: route('home'),
                    icon: Home,
                },
                {
                    title: 'À propos',
                    href: route('about'),
                    icon: Info,
                },
            ],
        },
        {
            title: 'Gestion',
            items: [
                {
                    title: 'Facultés',
                    href: route('#faculty.index'),
                    icon: School, // Plus approprié pour les facultés
                },
                {
                    title: 'Départements',
                    href: route('#department.index'),
                    icon: Users, // OK pour représenter des groupes
                },
                {
                    title: 'Orientation',
                    href: route('#orientation.index'),
                    icon: ArrowUp10Icon, // OK pour représenter un classement
                },
                {
                    title: 'Promotions',
                    href: route('#level.index'),
                    icon: GraduationCap, // Parfait pour les promotions
                },
                {
                    title: 'Professeurs',
                    href: route('#teacher.index'),
                    icon: User, // OK pour les professeurs
                },
                {
                    title: 'Cours',
                    href: route('#course.index'),
                    icon: Book, // Plus approprié que Bookmark pour des cours
                },
                {
                    title: 'Année académique',
                    href: route('#year.index'),
                    icon: Calendar, // Parfait pour une période
                },
                {
                    title: 'Semestre',
                    href: route('#semester.index'),
                    icon: ListEnd, // OK pour représenter une séquence
                },
                {
                    title: 'Notes',
                    href: route('#grade.index'),
                    icon: ClipboardList, // Plus approprié que FileText pour des notes
                },
                {
                    title: 'Étudiants',
                    href: route('#student.index'),
                    icon: Users,
                },

                {
                    title: 'Délibération',
                    href: route('#deliberation.index'),
                    icon: Database,
                },
                {
                    title: 'Résultats',
                    href: '#',
                    icon: ScrollText,
                },

                {
                    title: 'Utilisateur',
                    href: route('#user.index'),
                    icon: UserCog,
                },
            ],
        },

        {
            title: 'Excel',
            items: [
                {
                    title: 'Note',
                    href: route('#grade.excel.index'),
                    icon: File,
                },
                {
                    title: 'Etudiant',
                    href: route('#student.excel.index'),
                    icon: File,
                },
            ],
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItemsGroup} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
