import { apiClient } from "./apiClient";

export const getAllAchievByUserId = async (userId) => {
    return apiClient("auth/register", "GET", userId, {}, true);
};

export const getNumAchievByUserId = async (userId, num) => {
    return apiClient(`Achievement/user/${userId}/achievements/${num}`, "GET", null, {}, true);
};
