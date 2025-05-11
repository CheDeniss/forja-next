import {apiClient} from "../ClientServices/apiClient.js";

export const getAllGames = async () => {
    return apiClient("Games/games", "GET", null, {}, false);
}