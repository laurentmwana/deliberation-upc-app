import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup, SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowUp10Icon, Bookmark, BookOpen, Calendar, FileText, GraduationCap, Home, Info, ListEnd, User, UserCog, Users } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Utilisateur',
        href: '#',
        icon: UserCog,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

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
                    href: route('about'), // met une vraie route ici si elle existe
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
                    icon: BookOpen,
                },
                {
                    title: 'Départements',
                    href: route('#department.index'),
                    icon: Users,
                },
                {
                    title: 'Orientation',
                    href: route('#orientation.index'),
                    icon: ArrowUp10Icon,
                },
                {
                    title: 'Promotions',
                    href: route('#level.index'),
                    icon: GraduationCap,
                },
                {
                    title: 'Professeurs',
                    href: route('#teacher.index'),
                    icon: User,
                },
                {
                    title: 'Cours',
                    href: route('#course.index'),
                    icon: Bookmark,
                },
                {
                    title: 'Année académique',
                    href: route('#year.index'),
                    icon: Calendar,
                },

                {
                    title: 'Semestre',
                    href: route('#semester.index'),
                    icon: ListEnd,
                },
                {
                    title: 'Notes',
                    href: route('#grade.index'),
                    icon: FileText,
                },

                {
                    title: 'Résultats',
                    href: '#',
                    icon: FileText,
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
