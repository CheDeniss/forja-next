import { apiClient } from "./apiClient";

export const getUserStatistics = async (userId) => {
    return apiClient(`User/statistics/${userId} `, "GET", null, {}, true);
};

export const getUsersFriends = async (userId) => {
    return apiClient(`UserFollower/followed/${userId}`, "GET", null, {}, true);
}

export const follow = async (userId) => {
    return apiClient(`UserFollower/followers/${userId}`, "GET", null, {}, true);
}

export const unfollow = async (userId) => {
    return apiClient(`UserFollower/followers/${userId}`, "DELETE", null, {}, true);
}  //TODO реалізувати

export const getImageURL = async (avatarURL) => {
    return apiClient(`Files/images/url?objectPath=${avatarURL}`, "GET", null, {}, true);
}