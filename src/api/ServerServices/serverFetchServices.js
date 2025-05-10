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
