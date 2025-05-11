import {apiClient} from "./apiClient.js";

export const getHomePage = async () => {
    return apiClient("Home", "GET", null, {}, false);
}

export const getGenres = async () => {
    return apiClient("Genres/genres", "GET", null, {}, false);
}