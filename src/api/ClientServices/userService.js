import { apiClient } from "./apiClient.js";

export const authMe = async () => {
    return apiClient("User/self-profile", "GET", null, {}, true);
};

export const debug = async () => { // Для відладки - перевірка відправки токену
    return apiClient("user/debug-token", "GET", null, {}, true);
}


