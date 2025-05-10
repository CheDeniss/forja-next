import { apiClient } from "./apiClient.js";

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

export const getUserAchievements = async (userId) => {
    return apiClient(`Achievement/user/${userId}/achievements`, "GET", null, {}, true);
};

export const getUserProfileHatImages = async (num) => {
    return apiClient(`Files/profile-hat-variant?ProfileHatVariantId=${num}`, "GET", null, {}, true);
};

export const updateUserProfileHatVariant = async (userId, variant) => {
    const body = {
        userId,
        variant
    };
    console.log("updateUserProfileHatVariant", body);
    return apiClient(`User/profile-hat-variant/`, "POST", body, {}, true);
};

export const updateUserProfile = async (body) => {
    return apiClient(`User/profile`, "PUT", body, {}, true);
};

export const getUserProfileByIdentifier = async (identifier) => {
    return apiClient(`User/profile?identifier=${identifier}`, "GET", null, {}, true);
};
