import { apiClient } from "./apiClient";

export const getCatalog = async () => {
    return apiClient("Games/games", "GET", null, {}, false);
}

