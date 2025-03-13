import { apiClient } from "./apiClient";

export const authMe = async () => {
    return apiClient("user/self-profile", "GET", null, {}, true);
};

export const debug = async () => { // Для відладки - перевірка відправки токену
    return apiClient("user/debug-token", "GET", null, {}, true);
}


