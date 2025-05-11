import React from 'react';
import CatalogClient from '@/components/Catalog/CatalogClient/CatalogClient.jsx';
import { getCatalogFullServer } from '@/api/ServerServices/serverFetchServices';

export default async function CatalogPage({ searchParams }) {
    const paramsUrl = await searchParams;

    const filters = {
        genres: Array.isArray(paramsUrl.genres)
            ? paramsUrl.genres
            : paramsUrl.genres
                ? [paramsUrl.genres]
                : [],
        mechanics: Array.isArray(paramsUrl.mechanics)
            ? paramsUrl.mechanics
            : paramsUrl.mechanics
                ? [paramsUrl.mechanics]
                : [],
        tags: Array.isArray(paramsUrl.tags)
            ? paramsUrl.tags
            : paramsUrl.tags
                ? [paramsUrl.tags]
                : [],
        matureContents: Array.isArray(paramsUrl.matureContents)
            ? paramsUrl.matureContents
            : paramsUrl.matureContents
                ? [paramsUrl.matureContents]
                : [],
        discountOnly: paramsUrl.discountOnly === 'true',
        search: paramsUrl.search || '',
    };

    const page = parseInt(paramsUrl.page || '1', 10);
    const pageSize = 10;

    const { items, totalCount } = await getCatalogFullServer({
        ...filters,
        page,
        pageSize,
    });

    return (
        <CatalogClient
            initialFilters={filters}
            initialPage={page}
            initialGames={items}
            totalItems={totalCount}
        />
    );
}

