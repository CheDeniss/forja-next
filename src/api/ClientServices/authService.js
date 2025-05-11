import { apiClient } from "./apiClient.js";

export const registerUser = async (userData) => {
    return apiClient("Auth/register", "POST", userData);
};

export const loginUser = async (credentials) => {
    return apiClient("Auth/login", "POST", credentials, {}, true);
};

export const logoutUser = async () => {
    return apiClient("Auth/logout", "POST", null, {}, true);
}

export const refreshToken = async () => {
    return apiClient("Auth/refresh", "POST", null, {}, true);
}

export const resendEmailConfirmation = async () => {
    return apiClient("Auth/send-email-confirmation", "POST", null, {}, true);
}

export const verifyEmail = async (token) => {
    return apiClient(`Auth/users/confirm-email?token=${token}`, "PUT", null,{}, false);
}

export const triggerForgotPassword = async (userData) => {
    return apiClient("Auth/forgot-password", "POST", userData, {}, true);
}

export const resetPassword = async (userData) => {
    return apiClient("Auth/reset-password", "POST", userData, {}, true);
}