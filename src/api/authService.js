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

export const resendEmailConfirmation = async () => {
    return apiClient("auth/send-email-confirmation", "POST", null, {}, true);
}

export const verifyEmail = async (token) => {
    return apiClient(`auth/users/confirm-email?token=${token}`, "PUT", null,{}, false);
}

export const triggerForgotPassword = async (userData) => {
    return apiClient("auth/forgot-password", "POST", userData, {}, true);
}


export const resetPassword = async (userData) => {
    return apiClient("auth/reset-password", "POST", userData, {}, true);
}