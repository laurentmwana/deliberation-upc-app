import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

type ToastMessageProps = {};

export const ToastMessage: React.FC<ToastMessageProps> = ({}) => {
    const { flash: messages } = usePage<SharedData>().props;

    useEffect(() => {
        if (messages.success) {
            toast.success(messages.success);
        }

        if (messages.error) {
            toast.error(messages.error);
        }

        if (messages.warning) {
            toast.warning(messages.warning);
        }

        if (messages.info) {
            toast.info(messages.info);
        }
    }, [messages]);

    return null;
};
