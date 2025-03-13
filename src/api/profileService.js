import { apiClient } from "./apiClient";

export const getUsrInfo = async () => {
    return apiClient("auth/register", "POST");
};