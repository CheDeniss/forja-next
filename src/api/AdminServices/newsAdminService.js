import {apiClient} from "../ClientServices/apiClient.js";

export const createNewsArticle = async (news) => {
    return apiClient("NewsArticle", "POST", news, {}, true);
}

export const updateNewsArticle = async (id, data) => {
    return apiClient(`NewsArticle/${id}`, "PUT", data, {}, true);
}

export const deleteNewsArticle = async (id) => {
    return apiClient(`NewsArticle/${id}`, "DELETE", null, {}, true);
}