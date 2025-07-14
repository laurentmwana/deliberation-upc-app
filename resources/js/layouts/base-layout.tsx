import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { ToastMessage } from '@/components/toast-message';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Award, Grid, LogIn, LogOut } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

type BaseLayoutProps = PropsWithChildren<{}>;

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* Header responsive avec logo */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between px-4 sm:px-6">
                    {/* Nom de l'application à gauche (visible sur mobile et desktop) */}
                    <div className="flex items-center">
                        <span className="text-base font-semibold tracking-tight md:text-lg">Délibération UPC</span>
                    </div>

                    <nav className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:block">
                            <AppearanceToggleDropdown />
                        </div>

                        {auth.user ? (
                            <>
                                {auth.user.is_admin ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:h-9"
                                    >
                                        <Grid className="inline-block md:hidden" size={16} />
                                        <span className="hidden md:inline-block">Tableau de bord</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('result.index')}
                                        className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:h-9"
                                    >
                                        <Award className="inline-block md:hidden" size={16} />
                                        <span className="hidden md:inline-block">Résultats</span>
                                    </Link>
                                )}
                                <Link
                                    method="post"
                                    as="button"
                                    href={route('logout')}
                                    className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:h-9"
                                >
                                    <LogOut className="inline-block md:hidden" size={16} />
                                    <span className="hidden md:inline-block">Déconnexion</span>
                                </Link>
                            </>
                        ) : (
                            <Link
                                href={route('login')}
                                className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:h-9"
                            >
                                <LogIn className="inline-block md:hidden" size={16} />
                                <span className="hidden md:inline-block">Connexion</span>
                            </Link>
                        )}

                        {/* Mobile menu button (alternative pour le dropdown) */}
                        <div className="sm:hidden">
                            <AppearanceToggleDropdown />
                        </div>
                    </nav>
                </div>
            </header>

            {/* Contenu principal responsive */}
            <main className="container flex-1 px-4 py-6 sm:px-6 sm:py-8">
                <ToastMessage />
                {children}
            </main>

            <footer className="mx-auto mt-8 w-full max-w-4xl border-t border-border pt-6">
                <div className="text-center text-xs text-muted-foreground">
                    <p className="mb-1">Dans le cadre de l'examen de Génie Logiciel</p>
                    <p>
                        Sous la direction du <span className="font-medium text-foreground">Professeur KUYUSA</span>
                    </p>
                    <div className="mt-4 border-t border-border pt-4">
                        <p>&copy; {new Date().getFullYear()} - Université Protestante au Congo</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
