import { apiClient } from "./apiClient.js";

export const getWishlist = async () => {
    return apiClient(`UserWishList/self`, "GET", null, {}, true);
};

export const getUserGameLibrary = async (userId) => {
    return apiClient(`UserLibrary/games/user/${userId}`, "GET", null, {}, true);
};