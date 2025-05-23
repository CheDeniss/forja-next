import {apiClient} from "../ClientServices/apiClient.js";

export const getAllUsers = async () => {
    return apiClient("User/all", "GET", null, {}, true);
}

export const getFullUserById = async (id) => {
    return apiClient(`User/user/${id}`, "GET", null, {}, true);
}

export const getAllWishlists = async () => {
    return apiClient("UserWishList", "GET", null, {}, false);
}