import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type HeadingProps = PropsWithChildren<{ title: string, className ?: string }>;

export function Heading({ title, className = '', children }: HeadingProps) {
    return (
        <div className={cn("mb-8 space-y-0.5", className)}>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {children && <p className="text-muted-foreground text-sm">{children}</p>}
        </div>
    );
}

type HeadingSmallProps = PropsWithChildren<{ title: string }>;

export function HeadingSmall({ title, children }: HeadingSmallProps) {
    return (
        <header>
            <h3 className="mb-0.5 text-base font-medium">{title}</h3>
            {children && <p className="text-muted-foreground text-sm">{children}</p>}
        </header>
    );
}
