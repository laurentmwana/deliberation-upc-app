import { useEffect, useState } from 'react';

export const usePathname = () => {
    const [pathname, setPathname] = useState<string>('');

    useEffect(() => {
        const getPathname = () => {
            setPathname(window.location.pathname);
        };

        getPathname();
    }, [pathname]);

    return pathname;
};
