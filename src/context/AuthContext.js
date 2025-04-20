"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from "react";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshToken,
    resetPassword,
    triggerForgotPassword
} from "../../src/api/authService";
import { authMe } from "../../src/api/userService";
import logger from "../../src/utils/logger";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRoles, setUserRoles] = useState([]);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const hasTriedRefresh = useRef(false); // Прапорець, щоб не зациклити оновлення після невдалого рефрешу

    const setLoadingState = (state) => {
        setIsAuthLoading((prev) => (prev === state ? prev : state));
    };

    //  fetchUser
    const fetchUser = useCallback(async () => {
        if (isAuthLoading) return null;

        try {
            const response = await authMe();
            if (response) {
                setUser(response.userProfile);
                setUserRoles(response.userRoles);
                hasTriedRefresh.current = false;
            } else {
                logger.warn("AUTH_CONTEXT -> fetchUser :: `authMe` не повернув користувача");
                return null;
            }
        } catch (error) {
            if (error.message === "401") {
                if (!hasTriedRefresh.current) {
                    hasTriedRefresh.current = true;
                    logger.warn("AUTH_CONTEXT -> fetchUser :: Токен недійсний, спроба оновлення...");
                    return await handleRefreshToken();
                } else {
                    logger.warn("AUTH_CONTEXT -> fetchUser :: Рефреш вже був — виконуємо вихід.");
                    await logout();
                    return null;
                }
            } else {
                logger.error("AUTH_CONTEXT -> fetchUser :: Не вдалося отримати користувача", error);
                return null;
            }
        }
    }, [isAuthLoading]);

    // Викликаємо fetchUser при завантаженні
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    //  handleRefreshToken
    const handleRefreshToken = useCallback(async () => {
        if (isAuthLoading) {
            logger.warn("AUTH_CONTEXT -> handleRefreshToken :: Контекст зараз зайнятий");
            return false;
        }

        setLoadingState(true);
        try {
            await refreshToken();
            logger.info("AUTH_CONTEXT -> handleRefreshToken :: Токен оновлено успішно");
            await fetchUser();
        } catch (error) {
            logger.error("AUTH_CONTEXT -> handleRefreshToken :: Оновлення токена не вдалося", error);
            await logout();
            return null;
        } finally {
            setLoadingState(false);
        }
    }, [fetchUser, isAuthLoading]);

    //  register
    const register = useCallback(async (userData) => {
        if (isAuthLoading) {
            logger.warn("AUTH_CONTEXT -> register :: Контекст зараз зайнятий");
            return false;
        }

        setLoadingState(true);
        try {
            await registerUser(userData);
            logger.info("AUTH_CONTEXT -> register :: Реєстрація успішна");
            await login({ email: userData.email, password: userData.password });
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> register :: Помилка реєстрації", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, [isAuthLoading]);

    // login
    const login = useCallback(async (formData) => {
        if (isAuthLoading) {
            logger.warn("AUTH_CONTEXT -> login :: Контекст зараз зайнятий");
            return false;
        }

        setLoadingState(true);
        try {
            await loginUser(formData);
            logger.info("AUTH_CONTEXT -> login :: Вхід виконано успішно");
            await fetchUser();
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> login :: Помилка входу", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, [fetchUser, isAuthLoading]);

    //  logout
    const logout = useCallback(async () => {
        if (!user) {
            logger.warn("AUTH_CONTEXT -> logout :: Користувач не авторизований");
            return false;
        }
        if (isAuthLoading) {
            logger.warn("AUTH_CONTEXT -> logout :: Контекст зараз зайнятий");
            return false;
        }

        setLoadingState(true);
        try {
            await logoutUser();
            logger.info("AUTH_CONTEXT -> logout :: Вихід виконано успішно");
            return true;
        } catch (error) {
            logger.error("AUTH_CONTEXT -> logout :: Не вдалося вийти", error);
            return false;
        } finally {
            setUser(null);
            setLoadingState(false);
        }
    }, [user, isAuthLoading]);

    const handleForgotPassword = useCallback(async (userData) => {
        if (isAuthLoading) {
            logger.warn("AUTH_CONTEXT -> handleForgotPassword :: Контекст зараз зайнятий");
            return false;
        }

        setLoadingState(true);
        try {
            await triggerForgotPassword(userData); // ← викликає API-функцію
            logger.info("AUTH_CONTEXT -> handleForgotPassword :: Відновлення пароля успішно");
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> handleForgotPassword :: Помилка відновлення пароля", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, [isAuthLoading]);

    const handleResetPassword = useCallback(async (userData) => {
        if (isAuthLoading) {
            logger.warn("AUTH_CONTEXT -> handleResetPassword :: Контекст зараз зайнятий");
            return false;
        }

        setLoadingState(true);
        try {
            await resetPassword(userData);
            logger.info("AUTH_CONTEXT -> handleResetPassword :: Скидання пароля успішно");
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> handleResetPassword :: Помилка скидання пароля", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    }, [isAuthLoading]);

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
        [user,
            userRoles,
            isAuthLoading,
            login,
            register, 
            logout,
            fetchUser,
            handleRefreshToken,
            handleForgotPassword,
            handleResetPassword]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
