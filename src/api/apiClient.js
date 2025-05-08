import Logger from "../utils/logger";

export const API_URL = "https://localhost:7052/api";


export const apiClient = async (endpoint, method = "GET", body = null, headers = {}, withCredentials = false) => {
    const url = `${API_URL}/${endpoint}`;
    const options = {
        method,
        headers: {
            ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
            ...headers,
        },
        ...(withCredentials && { credentials: "include" }),
    };

    if (body) {
        options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    try {
        Logger.info(`API_CLIENT -> Sending API request :: ${method} ${url}`, options);
        console.log("🔍 NODE_EXTRA_CA_CERTS =", process.env.NODE_EXTRA_CA_CERTS);

        const response = await fetch(url, options);

        let responseData = null;

        if (response.status !== 204) {
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                responseData = await response.json().catch(() => null);
            } else {
                responseData = await response.text(); // повертає строку
            }
        }

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
