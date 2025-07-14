import { BaseLayout } from '@/layouts/base-layout';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <BaseLayout>
            <Head title="Système de Délibération UPC - LMD" />
            <div className="py-12">
                <div className="flex w-full items-center justify-center">
                    <main className="flex w-full flex-col-reverse sm:max-w-4xl lg:flex-row">
                        {/* Bloc texte */}
                        <div className="flex-1 border bg-card p-6 pb-12 text-sm leading-relaxed shadow-sm lg:rounded-tl-lg lg:rounded-br-none lg:p-10">
                            <h1 className="mb-2 text-2xl font-semibold text-foreground">Système de Délibération UPC-LMD</h1>
                            <p className="mb-4 text-muted-foreground">
                                Plateforme officielle de gestion des délibérations académiques conforme au système LMD.
                            </p>

                            <ul className="mb-6 space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background">
                                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                    </div>
                                    <span>
                                        Gestion des <span className="font-medium text-primary">étudiants et promotions</span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background">
                                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                    </div>
                                    <span>
                                        Calcul et validation des <span className="font-medium text-primary">notes et crédits</span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background">
                                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                    </div>
                                    <span>
                                        Génération des <span className="font-medium text-primary">coupons</span>
                                    </span>
                                </li>
                            </ul>

                            <div className="flex flex-col gap-3">
                                <Link
                                    href={auth.user ? (auth.user.is_admin ? route('dashboard') : route('result.index')) : route('login')}
                                    className="inline-block rounded bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    Accéder à la plateforme
                                </Link>
                                <Link
                                    href={route('about')}
                                    className="inline-block rounded border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                                >
                                    À propos
                                </Link>
                            </div>
                        </div>

                        {/* Illustration ou Logo */}
                        <div className="relative aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-muted lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">
                            <div className="flex h-full items-center justify-center px-4 text-center">
                                <div className="opacity-100 transition-opacity duration-700">
                                    <svg className="mx-auto mb-4 h-24 w-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                    </svg>
                                    <h2 className="mb-1 text-2xl font-bold text-foreground">UPC - Système LMD</h2>
                                    <p className="text-sm text-muted-foreground">Université Protestante au Congo</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-t-lg border lg:rounded-t-none lg:rounded-r-lg" />
                        </div>
                    </main>
                </div>
            </div>
        </BaseLayout>
    );
}
