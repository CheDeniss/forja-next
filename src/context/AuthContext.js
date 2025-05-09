'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useEffect,
    useRef
} from "react";

import {
    loginUser,
    logoutUser,
    registerUser,
    refreshToken,
    resetPassword,
    triggerForgotPassword
} from "@/api/authService";
import { authMe } from "@/api/userService";
import logger from "@/utils/logger";
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({ user: null, userRoles: null });
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const router = useRouter();
    const refreshIntervalRef = useRef(null);

    const setLoadingState = (state) => {
        setIsAuthLoading((prev) => (prev === state ? prev : state));
    };

    const fetchUser = useCallback(async () => {
        setLoadingState(true);
        try {
            const response = await authMe();
            if (response) {
                setUserData({
                    user: response.userProfile,
                    userRoles: response.userRoles
                });
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
            setUserData({ user: null, userRoles: null });
            await logoutUser();
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

            const success = await fetchUser();
            if (!success) {
                throw new Error("fetchUser failed after token refresh");
            }

        } catch (error) {
            logger.error('AUTH_CONTEXT -> handleRefreshToken :: Не вдалося оновити токен або отримати користувача, спроба виходу..', error);
            await logout();
        } finally {
            setLoadingState(false);
        }
    }, [fetchUser, isAuthLoading, logout]);

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

    useEffect(() => {
        if (!userData.user) return;

        refreshIntervalRef.current = setInterval(async () => {
            try {
                await handleRefreshToken();
            } catch (err) {
                logger.error("AUTH_CONTEXT -> silent refresh :: не вдалося оновити токен", err);
            }
        }, 4 * 60 * 1000);

        return () => {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
        };
    }, [userData.user, handleRefreshToken]);

    const value = useMemo(() => ({
        user: userData.user,
        userRoles: userData.userRoles,
        isAuthLoading,
        login,
        register,
        logout,
        fetchUser,
        handleRefreshToken,
        handleForgotPassword,
        handleResetPassword
    }), [
        userData.user,
        userData.userRoles,
        isAuthLoading,
        login,
        register,
        logout,
        fetchUser,
        handleRefreshToken,
        handleForgotPassword,
        handleResetPassword
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
