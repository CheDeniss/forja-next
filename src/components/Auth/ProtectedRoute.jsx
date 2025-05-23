'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {getLocaleFromCookie} from "@/utils/locale.js";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, userRoles, isAuthLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const locale = getLocaleFromCookie();

        if (!isAuthLoading && !isAuthenticated) {
            router.replace(`/${locale}/login`);
        } else if (!isAuthLoading && requiredRoles.length > 0) {
            const hasAccess = requiredRoles.some(role => userRoles.includes(role));
            if (!hasAccess) {
                router.replace(`/${locale}/403`);
            }
        }
    }, [isAuthenticated, userRoles, isAuthLoading]);

    return !isAuthLoading && isAuthenticated ? children : null;
};

export default ProtectedRoute;
