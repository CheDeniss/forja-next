"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loginUser, logoutUser, registerUser, refreshToken } from "../../src/api/authService";
import { authMe } from "../../src/api/userService";
import logger from "../../src/utils/logger";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    // Функція для оновлення стану завантаження щоб уникати зайвих ререндерів
    const setLoadingState = (state) => {
        setIsAuthLoading((prev) => (prev === state ? prev : state));
    };

    // Отримання поточного користувача
    const fetchUser = useCallback(async () => {
        if (isAuthLoading) return null; // Запобігаємо одночасному виконанню декількох запитів

        try {
            const response = await authMe();
            if (response) {
                setUser(response);
                // return response;
            } else {
                logger.warn("AUTH_CONTEXT -> fetchUser :: `authMe` не повернув користувача");
                return null;
            }
        } catch (error) {
            if (error.response?.status === 401) {
                if (!isAuthLoading) {
                    logger.warn("AUTH_CONTEXT -> fetchUser :: Токен недійсний, спроба оновлення...");
                    return await handleRefreshToken();
                } else {
                    logger.warn("AUTH_CONTEXT -> fetchUser :: Уже виконується оновлення токена");
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


    // Оновлення токена
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
            await logout(); // Якщо не вдалося оновити токен → виконуємо вихід
            return null;
        } finally {
            setLoadingState(false);
        }
    }, [fetchUser]);


    // Реєстрація нового користувача
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


    // Логін користувача
    const login = async (formData) => {
        if (isAuthLoading) {
            logger.warn("AUTH_CONTEXT -> login :: Контекст зараз зайнятий");
            return false;
        }

        setLoadingState(true);
        try {
            await loginUser(formData);
            logger.info("AUTH_CONTEXT -> login :: Вхід виконано успішно");
            await fetchUser(); // Повертаємо користувача одразу після входу
            return true;
        } catch (err) {
            logger.error("AUTH_CONTEXT -> login :: Помилка входу", err.message);
            throw err;
        } finally {
            setLoadingState(false);
        }
    };


    // Вихід (logout)
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
            setUser(null);
            logger.info("AUTH_CONTEXT -> logout :: Вихід виконано успішно");
            return true;
        } catch (error) {
            logger.error("AUTH_CONTEXT -> logout :: Не вдалося вийти", error);
            return false;
        } finally {
            setLoadingState(false);
        }
    };


    return (
        <AuthContext.Provider value={{ user, isAuthLoading, login, register, logout, handleRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
