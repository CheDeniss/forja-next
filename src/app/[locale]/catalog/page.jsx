'use client';

import React, { useEffect, useState, useRef } from 'react';
import catalogStyles from './Catalog.module.scss';
import FiltersPanel from '../../components/Catalog_components/FiltersPanel/FiltersPanel.jsx';
import { getCatalogFull } from '../../../api/catalogService.js';
import GameItem from '../../components/Catalog_components/GameItem/GameItem.jsx';
import { Skeleton, Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

const defaultFilters = {
    genres: [],
    mechanics: [],
    tags: [],
    matureContents: [],
    discountOnly: false,
    search: '',
};

const Catalog = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [hasInitialized, setHasInitialized] = useState(false);

    const [selectedFilters, setSelectedFilters] = useState(defaultFilters);
    const [page, setPage] = useState(1);
    const pageSize = 12;

    const router = useRouter();
    const searchParams = useSearchParams();

    // Завантаження фільтрів та сторінки з URL
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
        setHasInitialized(true); // дозвіл на фетч
    }, [searchParams]);


    // Оновлення URL при зміні фільтрів або сторінки
    useEffect(() => {
        const params = new URLSearchParams();

        Object.entries(selectedFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else if (typeof value === 'boolean') {
                if (value) params.set(key, 'true'); // додаємо тільки якщо true
            } else if (typeof value === 'string') {
                if (value.trim()) params.set(key, value.trim());
            }
        });

        if (page > 1) {
            params.set('page', page.toString());
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [selectedFilters, page]);

    // Завантаження ігор
    useEffect(() => {
        if (!hasInitialized) return; // не фетчити, поки не зчитані фільтри

        const fetchGames = async () => {
            setLoading(true);
            try {
                const response = await getCatalogFull({
                    ...selectedFilters,
                    page,
                    pageSize,
                });
                setGames(response.items);
                setTotalItems(response.totalCount);
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [selectedFilters, page, hasInitialized]);

    const handleFiltersChange = (updated) => {
        setSelectedFilters(updated);
        setPage(1); // при зміні фільтрів — на першу сторінку
    };

    const handleRemoveFilter = (category, value) => {
        const updated = { ...selectedFilters };

        if (Array.isArray(updated[category])) {
            updated[category] = updated[category].filter((item) => item !== value);
        } else {
            // Якщо не дисконт чи пошук
            updated[category] =
                category === 'discountOnly' ? false : category === 'search' ? '' : null;
        }

        setSelectedFilters(updated);
        setPage(1);
    };


    const clearAll = () => {
        setSelectedFilters(defaultFilters);
        setPage(1);
    };

    const renderSkeletons = (count = 6) =>
        Array.from({ length: count }, (_, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
                <Skeleton variant="rectangular" width="100%" height={180} />
                <Skeleton width="60%" sx={{ mt: 1 }} />
                <Skeleton width="40%" />
            </div>
        ));

    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <>
            <div className={catalogStyles.selectedFilters}>
                {/* Масивні фільтри (жанри, тегі ...) */}
                {Object.entries(selectedFilters).flatMap(([category, values]) =>
                    Array.isArray(values) && values.length > 0
                        ? values.map((value) => (
                            <span
                                key={`${category}-${value}`}
                                className={catalogStyles.filterChip}
                                data-category={category}
                            >
                            {value}
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveFilter(category, value)}
                                    disableRipple={true}
                                >
                                  <CancelIcon fontSize="inherit" />
                                </IconButton>
                            </span>
                                ))
                                : []
                            )}

                {/* DiscountOnly чіп */}
                {selectedFilters.discountOnly && (
                    <span
                        className={catalogStyles.filterChip}
                        data-category="other"
                    >
                      Зі знижкою
                        <IconButton
                            size="small"
                            onClick={() => handleRemoveFilter("discountOnly", true)}
                            disableRipple={true}
                        >
                          <CancelIcon fontSize="inherit" />
                        </IconButton>
                    </span>
                )}

                {/* Пошук */}
                {selectedFilters.search && (
                    <span
                        className={catalogStyles.filterChip}
                        data-category="search"
                    >
                      Пошук: "{selectedFilters.search}"
                         <IconButton
                             size="small"
                             onClick={() => handleRemoveFilter("search", "")}
                             disableRipple={true}
                         >
                          <CancelIcon fontSize="inherit" />
                        </IconButton>
                    </span>
                )}

                {/* Очистити всі */}
                {(Object.values(selectedFilters).some((arr) => Array.isArray(arr) && arr.length > 0) ||
                    selectedFilters.discountOnly ||
                    selectedFilters.search) && (
                    <span className={catalogStyles.filterChip}>
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


            <div className={catalogStyles.catalogContainer}>
                <div className={catalogStyles.mainContent}>
                    {loading
                        ? renderSkeletons()
                        : games.map((game) => <GameItem key={game.id}
                                                        data={game}
                        />)}

                    {totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            className={catalogStyles.pagination}
                        />
                    )}
                </div>

                <div className={catalogStyles.sidebar}>
                    <FiltersPanel filters={selectedFilters} onFiltersChange={handleFiltersChange}/>
                </div>
            </div>
        </>
    );
};

export default Catalog;
