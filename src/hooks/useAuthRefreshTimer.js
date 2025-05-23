'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { refreshToken } from '@/api/ClientServices/authService.js';
import logger from '@/utils/logger';

const REFRESH_INTERVAL_MS = 4 * 60 * 1000; // 4 хв

export const useAuthRefreshTimer = () => {
    const { user, fetchUser, logout } = useAuth();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let intervalId;

        logger.info('[REFRESH_TIMER] ⏳ Стартує логіка таймера');

        const refresh = async () => {
            try {
                logger.info('⏳ Початкове/чергове оновлення токена...');
                await refreshToken();
                localStorage.setItem('lastTokenRefresh', Date.now().toString());
                logger.info('🔁 Токен оновлено');
                setTimeout(() => {
                    logger.info('[REFRESH] 🟢 dispatching cart-updated');
                    window.dispatchEvent(new Event("cart-updated"));
                }, 800);
                if (!user) {
                    logger.info('🔍 Користувача нема — викликаємо fetchUser()');
                    await fetchUser();
                }
            } catch (e) {
                logger.warn('⛔ Не вдалося оновити токен — можливо, не залогінений');
                await logout();
            }
        };

        // Одразу при першому завантаженні
        refresh();

        // Далі — кожні 4 хвилини
        intervalId = setInterval(refresh, REFRESH_INTERVAL_MS);

        return () => {
            clearInterval(intervalId);
        };
    }, [user, fetchUser]);
};
