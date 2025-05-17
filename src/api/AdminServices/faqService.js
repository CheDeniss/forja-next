import { apiClient } from "../ClientServices/apiClient.js";

export const getAllFAQ = async () => {
    return apiClient('FAQ', "GET", null, {}, false);
}

export const addNewFAQ = async (faq) => {
    return apiClient(`FAQ`, "POST", faq, {}, true);
}

export const deleteFAQ = async (id) => {
    return apiClient(`FAQ/${id}`, "DELETE", null, {}, true);
}

export const updateFAQ = async (faq) => {
    return apiClient(`FAQ`, "PUT", faq, {}, true);
}