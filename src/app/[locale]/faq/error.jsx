'use client';

import { useEffect } from 'react';
import ErrorScreen from '@/components/ui/ErrorScreen/ErrorScreen';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('GamePage Error:', error);
    }, [error]);

    return (
        <ErrorScreen
            message={error?.message || 'Невідома помилка'}
            reset={reset}
        />
    );
}
