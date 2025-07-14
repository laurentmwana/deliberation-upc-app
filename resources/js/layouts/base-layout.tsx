import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

type BaseLayoutProps = PropsWithChildren<{}>;

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="flex flex-col items-center bg-background p-6 text-foreground lg:justify-center lg:p-8">
            <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
                <nav className="flex items-center justify-end gap-4">
                    <AppearanceToggleDropdown />
                    {auth.user ? (
                        <>
                            {auth.user.is_admin ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border/70 hover:bg-accent"
                                >
                                    Tableau de bord
                                </Link>
                            ) : (
                                <Link
                                    href={route('result.index')}
                                    className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border/70 hover:bg-accent"
                                >
                                    Résultats
                                </Link>
                            )}
                            <Link
                                method="post"
                                as="button"
                                href={route('logout')}
                                className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border/70 hover:bg-accent"
                            >
                                Déconnexion
                            </Link>
                        </>
                    ) : (
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border hover:bg-accent"
                        >
                            Connexion
                        </Link>
                    )}
                </nav>
            </header>

            <main className="container">{children}</main>
        </div>
    );
};
