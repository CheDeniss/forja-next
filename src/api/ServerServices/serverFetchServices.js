{/* КАТАЛОГ */}
export async function getCatalogFullServer(filters, pageNumber = 1, pageSize = 10) {
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Games/games-catalog?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store', // або 'force-cache', залежить від того, чи потрібно кешування
    });

    if (!res.ok) {
        throw new Error('Помилка при отриманні каталогу ігор');
    }

    return await res.json();
}

{/* ПРОФІЛЬ */}
export async function getProfileData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Profile/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Помилка при отриманні профілю');
    }

    return await res.json();
}

{/* ГРА */}
export async function getGameByIdServer(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Games/games/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Гра не знайдена');
    }

    return await res.json();
}

{/* FAQ */}
export async function getAllFAQ(locale) {
    const lang = locale === 'uk' ? 'uk' : 'en';

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/FAQ`);
    if (!res.ok) throw new Error("Failed to fetch FAQs");

    const data = await res.json();

    return data.filter(faq =>
        lang === 'uk' ? faq.order < 0 : faq.order > 0
    ).map(faq => ({
        ...faq,
        order: Math.abs(faq.order)
    })).sort((a, b) => a.order - b.order);
}

{/* НОВИНИ */}
export async function getAllNews(pageNumber = 1, pageSize = 10) {
    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/NewsArticle/active?${params.toString()}`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store"
        });

        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`);
            return { paginatedResult: { items: [], totalCount: 0 }, prioritizedNewsArticles: [] };
        }

        const text = await res.text();
        if (!text) {
            console.warn('Empty response body');
            return { paginatedResult: { items: [], totalCount: 0 }, prioritizedNewsArticles: [] };
        }

        return JSON.parse(text);
    } catch (error) {
        console.error("getAllNews error:", error);
        return { paginatedResult: { items: [], totalCount: 0 }, prioritizedNewsArticles: [] };
    }
}


export async function getNewsById(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/NewsArticle/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            console.warn(`getNewsById → Failed to fetch news with id ${id}. Status: ${res.status}`);
            return [];
        }

        return await res.json();
    } catch (error) {
        console.error(`getNewsById → Error fetching news with id ${id}:`, error);
        return [];
    }
}


