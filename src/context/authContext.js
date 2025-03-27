"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { loginUser, logoutUser, registerUser, refreshToken } from "../../src/api/authService";
import { authMe } from "../../src/api/userService";
import logger from "../../src/utils/logger";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const hasTriedRefresh = useRef(false); // Прапорець, щоб не зациклити оновлення після невдалого рефрешу

    const setLoadingState = (state) => {
        setIsAuthLoading((prev) => (prev === state ? prev : state));
    };

    const fetchUser = useCallback(async () => {
        if (isAuthLoading) return null;

        try {
            const response = await authMe();
            if (response) {
                setUser(response);
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

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

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
    }, [fetchUser]);

    const register = async (userData) => {
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
    };

    const login = async (formData) => {
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
    };

    const logout = async () => {
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
    };

    return (
        <AuthContext.Provider value={{ user, isAuthLoading, login, register, logout, fetchUser, handleRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
