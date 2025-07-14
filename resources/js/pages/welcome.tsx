import { BaseLayout } from '@/layouts/base-layout';
import type { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <BaseLayout>
            <Head title="Système de Délibération UPC - LMD" />
            <div className="py-12">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full min-w-[335px] flex-col-reverse sm:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg border bg-card p-6 pb-12 text-[13px] leading-[20px] shadow-sm lg:rounded-tl-lg lg:rounded-br-none lg:p-20">
                            <h1 className="mb-1 text-2xl font-medium text-foreground">Système de Délibération UPC-LMD</h1>
                            <p className="mb-2 text-muted-foreground">
                                Plateforme officielle de gestion des délibérations académiques.
                                <br />
                                Conforme au système Licence-Master-Doctorat (LMD).
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                        </span>
                                    </span>
                                    <span>
                                        Gestion des
                                        <span className="ml-1 inline-flex items-center space-x-1 font-medium text-primary hover:text-primary/80">
                                            <span>étudiants et promotions</span>
                                        </span>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-0 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                        </span>
                                    </span>
                                    <span>
                                        Calcul et validation des
                                        <span className="ml-1 inline-flex items-center space-x-1 font-medium text-primary hover:text-primary/80">
                                            <span>notes et crédits</span>
                                        </span>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                                        </span>
                                    </span>
                                    <span>
                                        Génération des
                                        <span className="ml-1 inline-flex items-center space-x-1 font-medium text-primary hover:text-primary/80">
                                            <span>coupons</span>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <a
                                        href={auth.user ? route('dashboard') : route('login')}
                                        className="inline-block rounded-sm bg-primary px-5 py-1.5 text-sm leading-normal text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        Accéder à la plateforme
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-muted lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center opacity-100 transition-all duration-750 starting:opacity-0">
                                    <div className="mb-4">
                                        <svg className="mx-auto h-24 w-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                        </svg>
                                    </div>
                                    <h2 className="mb-2 text-2xl font-bold text-foreground">UPC - Système LMD</h2>
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
