'use client';

import React, { useEffect, useState } from 'react';
import styles from './CatalogClient.module.scss';
import FiltersPanel from '@/components/ui/FiltersPanel/FiltersPanel.jsx';
import { getCatalogFull } from '@/api/ClientServices/catalogService.js';
import GameItem from '@/components/Catalog/GameItem/GameItem.jsx';
import { Skeleton, Pagination, CircularProgress, IconButton } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import CancelIcon from '@mui/icons-material/Cancel';

const defaultFilters = {
    genres: [],
    mechanics: [],
    tags: [],
    matureContents: [],
    discountOnly: false,
    search: '',
};

const CatalogClient = ({ initialFilters, initialPage, initialGames, totalItemsFromServer }) => {
    const [games, setGames] = useState(initialGames);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(totalItemsFromServer);
    const [hasInitialized, setHasInitialized] = useState(false);

    const [selectedFilters, setSelectedFilters] = useState(initialFilters);
    const [page, setPage] = useState(initialPage);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const pageSize = 10;

    const router = useRouter();
    const searchParams = useSearchParams();

    // Завантаження фільтрів з URL
    useEffect(() => {
        const parseFiltersFromUrl = () => {
            const getArray = (key) => searchParams.getAll(key);
            const getBool = (key) => searchParams.get(key) === 'true';
            const getString = (key) => searchParams.get(key) || '';

            return {
                genres: getArray('genres'),
                mechanics: getArray('mechanics'),
                tags: getArray('tags'),
                matureContents: getArray('matureContents'),
                discountOnly: getBool('discountOnly'),
                search: getString('search'),
            };
        };

        const parsedFilters = parseFiltersFromUrl();
        const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

        setSelectedFilters(parsedFilters);
        setPage(isNaN(pageFromUrl) ? 1 : pageFromUrl);
        setHasInitialized(true);
    }, [searchParams]);

    // Оновлення URL
    useEffect(() => {
        const params = new URLSearchParams();

        Object.entries(selectedFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
            else if (typeof value === 'boolean') {
                if (value) params.set(key, 'true');
            } else if (typeof value === 'string' && value.trim()) {
                params.set(key, value.trim());
            }
        });

        if (page > 1) params.set('page', page.toString());

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [selectedFilters, page]);

    // Завантаження ігор
    useEffect(() => {
        if (!hasInitialized) return;

        const fetchGames = async () => {
            setLoading(true);
            try {
                if (!isFirstLoad){
                    const response = await getCatalogFull({
                        ...selectedFilters,
                        page,
                        pageSize,
                    });
                    setGames(response.items);
                    setTotalItems(response.totalCount);
                }
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
                setIsFirstLoad(false);
            }
        };

        fetchGames();
    }, [selectedFilters, page, hasInitialized]);

    const handleFiltersChange = (updated) => {
        setSelectedFilters(updated);
        setPage(1);
    };

    const handleRemoveFilter = (category, value) => {
        const updated = { ...selectedFilters };

        if (Array.isArray(updated[category])) {
            updated[category] = updated[category].filter((item) => item !== value);
        } else {
            updated[category] = category === 'discountOnly' ? false : category === 'search' ? '' : null;
        }

        setSelectedFilters(updated);
        setPage(1);
    };

    const clearAll = () => {
        setSelectedFilters(defaultFilters);
        setPage(1);
    };

    const renderSkeletons = (count = 10) =>
        Array.from({ length: count }, (_, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
                <Skeleton variant="rectangular" sx={{ height: '16vh', width: '100%' }} />
            </div>
        ));

    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <>
            <div className={styles.selectedFilters}>
                {Object.entries(selectedFilters).flatMap(([category, values]) =>
                        Array.isArray(values) && values.length > 0
                            ? values.map((value) => (
                                <span
                                    key={`${category}-${value}`}
                                    className={styles.filterChip}
                                    data-category={category}>
                  {value}
                                    <IconButton size="small" onClick={() => handleRemoveFilter(category, value)} disableRipple>
                    <CancelIcon fontSize="inherit"/>
                  </IconButton>
                </span>
                            ))
                            : []
                )}

                {selectedFilters.discountOnly && (
                    <span
                        className={styles.filterChip}
                        data-category="other">
            Зі знижкою
            <IconButton size="small" onClick={() => handleRemoveFilter('discountOnly', true)} disableRipple>
              <CancelIcon fontSize="inherit"/>
            </IconButton>
          </span>
                )}

                {selectedFilters.search && (
                    <span
                        className={styles.filterChip}
                        data-category="search">
            Пошук: "{selectedFilters.search}"
            <IconButton size="small" onClick={() => handleRemoveFilter('search', '')} disableRipple>
              <CancelIcon fontSize="inherit"/>
            </IconButton>
          </span>
                )}

                {(Object.values(selectedFilters).some((arr) => Array.isArray(arr) && arr.length > 0) ||
                    selectedFilters.discountOnly ||
                    selectedFilters.search) && (
                    <span className={styles.filterChip}>
                      Очистити всі
                      <IconButton
                          size="small"
                          onClick={clearAll}
                          disableRipple={true}
                      >
                          <CancelIcon fontSize="inherit" />
                        </IconButton>
                    </span>
                )}
            </div>

            <div className={styles.catalogContainer}>
                <div className={styles.mainContent}>
                    {loading ? ( renderSkeletons() )
                        :
                        (games.map((game) => <GameItem key={game.id} data={game}/>))
                    }
                    {totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            className={styles.pagination}
                        />
                    )}
                </div>
                <div className={styles.sidebar}>
                    <FiltersPanel filters={selectedFilters} onFiltersChange={handleFiltersChange}/>
                </div>
            </div>
        </>
    );
};

export default CatalogClient;
