import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type UserModel } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Eye, LogOut, Settings } from 'lucide-react';

interface UserMenuContentProps {
    user: UserModel;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Paramètres
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('home')} as="button" prefetch onClick={cleanup}>
                        <Eye className="mr-2" />
                        Voir le site
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Se déconnecter
                </Link>
            </DropdownMenuItem>
        </>
    );
}
