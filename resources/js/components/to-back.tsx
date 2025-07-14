import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowLeftFromLine, ArrowUp01Icon, ArrowUpLeft } from 'lucide-react';
import React from 'react';

type ToBackProps = {
    url: string;
};

export const ToBack: React.FC<ToBackProps> = ({ url }) => {
    return (
        <div>
            <Link
                href={url}
                className="inline-flex h-6 items-center justify-center rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:h-8"
            >
                <ArrowLeft size={15} />
            </Link>
        </div>
    );
};
