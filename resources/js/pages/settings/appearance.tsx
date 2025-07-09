import AppearanceTabs from '@/components/appearance-tabs';
import { HeadingSmall } from '@/components/heading';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';


export default function Appearance() {
    return (
        <AppLayout>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings">Update your account's appearance settings</HeadingSmall>
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
