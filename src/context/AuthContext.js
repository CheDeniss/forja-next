
'use client';

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshToken,
    resetPassword,
    triggerForgotPassword
} from "@/api/authService";
import logger from "@/utils/logger";
import { authMe } from "@/api/userService";
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRoles, setUserRoles] = useState([]);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const router = useRouter();

    const setLoadingState = (state) => {
        setIsAuthLoading((prev) => (prev === state ? prev : state));
    };

    const fetchUser = useCallback(async () => {
        setLoadingState(true);
        try {
            const response = await authMe();
            if (response) {
                setUser(response.userProfile);
                setUserRoles(response.userRoles);
                logger.info("AUTH_CONTEXT -> fetchUser :: Користувача отримано");
                return true;
            } else {
                logger.warn("AUTH_CONTEXT -> fetchUser :: Користувача не знайдено");
                return false;
            }
        } catch (error) {
            logger.error("AUTH_CONTEXT -> fetchUser :: Помилка", error);
            return false;
        } finally {
            setLoadingState(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoadingState(true);
        try {
            await logoutUser();
            setUser(null);
            setUserRoles([]);
            logger.info("AUTH_CONTEXT -> logout :: Вихід виконано успішно");
            return true;
        } catch (error) {
            logger.error("AUTH_CONTEXT -> logout :: Не вдалося вийти", error);
            return false;
        } finally {
            setLoadingState(false);
        }
    }, []);


    const handleRefreshToken = useCallback(async () => {
        if (isAuthLoading) {
            logger.warn('AUTH_CONTEXT -> handleRefreshToken :: Контекст зайнятий');
            return;
        }

        setLoadingState(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 50));
            await refreshToken();
            logger.info('AUTH_CONTEXT -> handleRefreshToken :: Токен оновлено успішно');
            await fetchUser();
        } catch (error) {
            logger.error('AUTH_CONTEXT -> handleRefreshToken :: Не вдалося оновити токен', error);

            await logout();
            // router.replace('/login'); // редірект на логін
        } finally {
            setLoadingState(false);
        }
    }, [fetchUser, isAuthLoading, logout, router]);

    const login = useCallback(async (formData) => {
        setLoadingState(true);
        try {
            await loginUser(formData);
            await fetchUser();
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> login :: Помилка входу", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, [fetchUser]);

    const register = useCallback(async (userData) => {
        setLoadingState(true);
        try {
            await registerUser(userData);
            await login({ email: userData.email, password: userData.password });
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> register :: Помилка реєстрації", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, [login]);

    const handleForgotPassword = useCallback(async (userData) => {
        setLoadingState(true);
        try {
            await triggerForgotPassword(userData);
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> handleForgotPassword :: Помилка", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, []);

    const handleResetPassword = useCallback(async (userData) => {
        setLoadingState(true);
        try {
            await resetPassword(userData);
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> handleResetPassword :: Помилка", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, []);

    const value = useMemo(
        () => ({
            user,
            userRoles,
            isAuthLoading,
            login,
            register,
            logout,
            fetchUser,
            handleRefreshToken,
            handleForgotPassword,
            handleResetPassword
        }),
        [user, userRoles, isAuthLoading, login, register, logout, fetchUser, handleRefreshToken, handleForgotPassword, handleResetPassword]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
