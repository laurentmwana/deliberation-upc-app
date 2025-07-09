'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname } from '@/hooks/use-pathname';
import { ago } from '@/lib/date-time';
import { router } from '@inertiajs/react';
import { ArrowLeft, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HistoryItem {
    path: string;
    title: string;
    created_at: Date;
}

export const HistoryButton = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Charger l'historique depuis localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('navigation-history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Ajouter la page actuelle à l'historique
    useEffect(() => {
        const pageTitle = document.title || pathname.split('/').pop() || 'Page';

        const newItem: HistoryItem = {
            path: pathname,
            title: pageTitle,
            created_at: new Date(),
        };

        setHistory((prev) => {
            // Éviter les doublons et garder seulement les 10 derniers
            const filtered = prev.filter((item) => item.path !== pathname);
            const newHistory = [newItem, ...filtered].slice(0, 5);

            localStorage.setItem('navigation-history', JSON.stringify(newHistory));
            return newHistory;
        });
    }, [pathname]);

    const handleNavigate = (path: string) => {
        router.get(path);
        setIsOpen(false);
    };

    const handleBack = () => {
        if (history.length > 1) {
            // Naviguer vers la page précédente dans l'historique
            const previousPage = history[1];
            router.get(previousPage.path);
        } else {
            window.history.back();
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Bouton Retour */}
            <Button variant="outline" size="sm" onClick={handleBack} className="h-8 w-8 bg-transparent p-0" title="Retour">
                <ArrowLeft size={16} />
            </Button>

            {/* Bouton Historique */}
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Historique de navigation">
                        <Clock size={16} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="w-80">
                    <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">Historique récent</div>

                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <DropdownMenuItem
                                key={`${item.path}-${index}`}
                                onClick={() => handleNavigate(item.path)}
                                className="flex cursor-pointer items-center justify-between gap-2 py-2"
                            >
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <span className="truncate font-medium">{item.title}</span>
                                    <span className="text-muted-foreground truncate text-xs">{item.path}</span>
                                </div>
                                <span className="text-muted-foreground text-xs">{ago(item.created_at)}</span>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="text-muted-foreground px-2 py-4 text-center text-sm">Aucun historique</div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
