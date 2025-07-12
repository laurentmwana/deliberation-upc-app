import AppearanceTabs from '@/components/appearance-tabs';
import { HeadingSmall } from '@/components/heading';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function Appearance() {
    return (
        <AppLayout>
            <Head title="Paramètres d'apparence" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Paramètres d'apparence">
                        Mettez à jour les paramètres d'apparence de votre compte
                    </HeadingSmall>
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
