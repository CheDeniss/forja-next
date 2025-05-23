import Logger from "../../utils/logger.js";
import { getLocaleFromCookie } from "@/utils/locale.js";
import { refreshToken } from "@/api/ClientServices/authService.js";

let isRefreshing = false; // змінна для контролю повторних запитів

export const apiClient = async (
    endpoint,
    method = "GET",
    body = null,
    headers = {},
    withCredentials = false,
    retry = false
) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
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
        const response = await fetch(url, options);

        let responseData = null;
        if (response.status !== 204) {
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                responseData = await response.json().catch(() => null);
            } else {
                responseData = await response.text();
            }
        }

        const isAuthAction = endpoint === "Auth/refresh" || endpoint === "Auth/logout";

        // 401 → пробуємо оновити токен
        if (response.status === 401 && !retry && !isRefreshing && !isAuthAction) {
            Logger.warn("401 detected. Trying to refresh token...");
            isRefreshing = true;

            try {
                await refreshToken();
                isRefreshing = false;
                return await apiClient(endpoint, method, body, headers, withCredentials, true);
            } catch (refreshError) {
                isRefreshing = false;
                Logger.warn("Refresh failed. Redirecting to login...");

                if (typeof window !== "undefined") {
                    const locale = getLocaleFromCookie();
                    const currentPath = window.location.pathname + window.location.search;
                    const returnTo = currentPath.startsWith('/') ? `?returnTo=${encodeURIComponent(currentPath)}` : '';
                    window.location.href = `/${locale}/auth/login${returnTo}`;
                }

                throw refreshError;
            }
        }


        //  403 → редирект
        if (response.status === 403) {
            Logger.warn("403 Forbidden. Redirecting...");
            if (typeof window !== "undefined") {
                const locale = getLocaleFromCookie();
                window.location.href = `/${locale}/403`;
            }
        }

        if (!response.ok) {
            const error = new Error(`${response.status}`);
            error.responseData = responseData;
            throw error;
        }

        Logger.info(`API_CLIENT -> API response received :: ${response.status}`, responseData);
        return responseData;

    } catch (error) {
        isRefreshing = false;

        Logger.error("API_CLIENT -> request failed", {
            message: error.message,
            responseData: JSON.stringify(error.responseData, null, 2) || "No response data",
            stack: error.stack,
        });

        throw error;
    }
};


// import Logger from "../../utils/logger.js";
//
//
// export const apiClient = async (endpoint, method = "GET", body = null, headers = {}, withCredentials = false) => {
//     const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
//     const options = {
//         method,
//         headers: {
//             ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
//             ...headers,
//         },
//         ...(withCredentials && { credentials: "include" }),
//     };
//
//     if (body) {
//         options.body = body instanceof FormData ? body : JSON.stringify(body);
//     }
//
//     try {
//         Logger.info(`API_CLIENT -> Sending API request :: ${method} ${url}`, options);
//         console.log("🔍 NODE_EXTRA_CA_CERTS =", process.env.NODE_EXTRA_CA_CERTS);
//
//         const response = await fetch(url, options);
//
//         let responseData = null;
//
//         if (response.status !== 204) {
//             const contentType = response.headers.get("content-type") || "";
//             if (contentType.includes("application/json")) {
//                 responseData = await response.json().catch(() => null);
//             } else {
//                 responseData = await response.text(); // повертає строку
//             }
//         }
//
//         if (!response.ok) {
//             const error = new Error(`${response.status}`);
//             error.responseData = responseData;
//             throw error;
//         }
//
//         Logger.info(`API_CLIENT -> API response received :: ${response.status}`, responseData);
//
//         return responseData; // Повертаємо JSON-відповідь
//
//     } catch (error) {
//         Logger.error("API_CLIENT -> request failed", {
//             message: error.message,
//             responseData: JSON.stringify(error.responseData, null, 2) || "No response data", // Виводимо JSON або пишемо, що його немає
//             stack: error.stack,
//         });
//
//         throw error;
//     }
// };
