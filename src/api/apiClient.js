import Logger from "../utils/logger";

export const API_URL = "https://localhost:7052/api"; // Базовий URL бекенду

export const apiClient = async (endpoint, method = "GET", body = null, headers = {}, withCredentials = false) => {
    const url = `${API_URL}/${endpoint}`;
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers, // Можливість додати додаткові заголовки
        },
        ...(withCredentials && { credentials: "include" }),
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        Logger.info(`API_CLIENT -> Sending API request :: ${method} ${url}`, options);
        const response = await fetch(url, options);

        const responseData = response.status !== 204 ? await response.json().catch(() => null) : null;

        if (!response.ok) {
            const error = new Error(`${response.status}`);
            error.responseData = responseData;
            throw error;
        }

        Logger.info(`API_CLIENT -> API response received :: ${response.status}`, responseData);

        return responseData; // Повертаємо JSON-відповідь

    } catch (error) {
        Logger.error("API_CLIENT -> request failed", {
            message: error.message,
            responseData: JSON.stringify(error.responseData, null, 2) || "No response data", // Виводимо JSON або пишемо, що його немає
            stack: error.stack,
        });

        throw error;
    }
};
