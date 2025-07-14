import { ToastMessage } from '@/components/toast-message';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children, ...props }: AppLayoutProps) {
    return (
        <>
            <ToastMessage />
            <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>;
        </>
    );
}
