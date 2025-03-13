import { apiClient } from "./apiClient";

export const registerUser = async (userData) => {
    return apiClient("auth/register", "POST", userData);
};

export const loginUser = async (credentials) => {
    return apiClient("auth/login", "POST", credentials, {}, true);
};

export const logoutUser = async () => {
    return apiClient("auth/logout", "POST", null, {}, true);
}

export const refreshToken = async () => {
    return apiClient("auth/refresh", "POST", null, {}, true);
}
