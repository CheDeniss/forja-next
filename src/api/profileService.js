import { apiClient } from "./apiClient";

export const getUserStatistics = async (userId) => {
    return apiClient(`User/statistics/${userId} `, "GET", null, {}, true);
};

export const getUsersFriendsList = async (userId) => {
    return apiClient(`UserFollower/followed/${userId}`, "GET", null, {}, true);
}

export const startFollow = async (followerId, followedId) => {
    const body = {
        followerId,
        followedId
    };

    return apiClient("UserFollower", "POST", body, {}, true);
};


export const unfollow = async (followedId) => {
    return apiClient(`UserFollower/${followedId}`, "DELETE", null, {}, true);
}

export const getImageURL = async (avatarURL) => {
    return apiClient(`Files/images/url?objectPath=${avatarURL}`, "GET", null, {}, true);
}