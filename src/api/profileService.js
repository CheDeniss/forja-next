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

export const getUserGameLibrary = async (userId) => {
    return apiClient(`UserLibrary/games/user/${userId}`, "GET", null, {}, true);
};

export const getUserGameAchievementsNum = async (userId, num) => {
    return apiClient(`Achievement/user/${userId}/achievements/${num}`, "GET", null, {}, true);
}

export const getGameAchievements = async (gameId) => {
    return apiClient(`Achievement/game/${gameId}/all`, "GET", null, {}, true);
};