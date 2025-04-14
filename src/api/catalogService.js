import { apiClient } from "./apiClient";

export const getAttributes  = async (id) => {
    return apiClient('FilterData/product-filters', "GET", null, {}, false);
}

export const getGameById = async (id) => {
    return apiClient(`Games/games/${id}`, "GET", null, {}, false);
}

export async function getCatalogFull( filters, pageNumber = 1, pageSize = 10 ) {
    const params = new URLSearchParams();

    const arrayKeys = ['genres', 'mechanics', 'tags', 'matureContents'];
    arrayKeys.forEach((key) => {
        (filters[key] || []).forEach((value) => {
            params.append(key, value);
        });
    });

    if (filters.search?.trim()) {
        params.append('search', filters.search.trim());
    }

    if (filters.discountOnly) {
        params.append('discountOnly', 'true');
    }

    params.append('pageNumber', pageNumber.toString());
    params.append('pageSize', pageSize.toString());

    const response = await apiClient(
        `Games/games-catalog?${params.toString()}`,
        "GET",
        null,
        {},
        false
    );

    if (!response || !Array.isArray(response.items)) {
        throw new Error("Некоректна відповідь від API");
    }

    return response;
}
