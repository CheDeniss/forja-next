import {apiClient} from "../apiClient.js";

export const getAllUsers = async () => {
    return apiClient("User/all", "GET", null, {}, true);
}

export const getFullUserById = async (id) => {
    return apiClient(`User/user/${id}`, "GET", null, {}, true);
}

// export const getUserById = async (id) => {