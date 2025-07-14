import { Heading } from '@/components/heading';
import { ToBack } from '@/components/to-back';
import { BaseLayout } from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <BaseLayout>
            <Head title="Système de Délibération UPC - LMD" />
            <div className="py-12">
                <div className="mb-4">
                    <ToBack url={route('home')} />
                </div>
                <Heading title="Travail réalisé en groupe">
                    Ce travail a été réalisé dans le cadre de l’examen de
                    <span className="font-semibold"> génie logiciel</span>.
                </Heading>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Il s'agit d'un projet mené en groupe afin de mettre en pratique les compétences acquises tout au long du cours, notamment en
                        modélisation, développement d'applications web et en gestion de projet logiciel.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Le projet a été conçu et développé par un groupe composé de <span className="font-semibold">5 membres</span> :
                    </p>

                    <ul className="my-5 list-inside list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                        <li>
                            <span className="font-medium">Elongo Nduaya Glody</span>
                        </li>
                        <li>
                            <span className="font-medium">Kangeni Mutunmosi Cleophas</span>
                        </li>
                        <li>
                            <span className="font-medium">Bokele Mbusa Body</span>
                        </li>
                        <li>
                            <span className="font-medium">Kiambote Mayele Ange</span>
                        </li>
                        <li>
                            <span className="font-medium">Baengoa Eniganya Gérard</span>
                        </li>
                    </ul>

                    <p className="text-sm text-muted-foreground">
                        Chaque membre a contribué activement à la conception, au développement et à la documentation du projet.
                    </p>
                </div>
            </div>
        </BaseLayout>
    );
}
