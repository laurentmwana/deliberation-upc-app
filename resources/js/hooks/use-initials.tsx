import { getInitials } from '@/lib/utils';
import { useCallback } from 'react';

export function useInitials() {
    return useCallback((fullName: string): string | null => getInitials(fullName), []);
}
