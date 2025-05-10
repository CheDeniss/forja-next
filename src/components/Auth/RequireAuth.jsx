'use client';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {getLocaleFromCookie} from "@/utils/locale.js";

export default function RequireAuth({ children }) {
    const { user, fetchUser, isAuthLoading } = useAuth();
    const [tried, setTried] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const run = async () => {
            if (!user && !tried) {
                setTried(true);
                await fetchUser();
            }
        };

        run();
    }, [user, tried, fetchUser]);

    useEffect(() => {
        if (!isAuthLoading && !user && tried) {
            const locale = getLocaleFromCookie();
            router.replace(`/${locale}/auth/login`);
        }
    }, [user, isAuthLoading, router]);

    if (!user) return null;
    return children;
}
