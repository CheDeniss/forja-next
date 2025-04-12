import {apiClient} from "../apiClient.js";

export const getAllGames = async () => {
    return apiClient("Games/games", "GET", null, {}, false);
}