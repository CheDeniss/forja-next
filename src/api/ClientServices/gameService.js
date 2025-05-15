import { apiClient } from "./apiClient.js";

export const getGameById = async (gameId) => {
    return apiClient(`Games/games/${gameId}`, "GET", null, {}, false);
}

export const GetAllAddonsForGame = async (gameId) => {
    return apiClient(`Games/game-addons/games/${gameId}`, "GET", null, {}, true);
}

export const GetAllReviewsForGame = async (gameId, page = 1, pageSize = 10) => {
    return apiClient(`Review/products/${gameId}?pageNumber=${page}&pageSize=${pageSize}`, "GET", null, {}, true);
}

