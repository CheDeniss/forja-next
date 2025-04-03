'use client';

import React, { useEffect, useState } from 'react';
import catalogStyles from './Catalog.module.scss';
import FiltersPanel from "../../components/Catalog_components/FiltersPanel/FiltersPanel.jsx";
import { getCatalog } from "../../../api/catalogService.js";
import GameItem from "../../components/Catalog_components/GameItem/GameItem.jsx";
import { Skeleton } from '@mui/material';

const Catalog = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Завантаження ігор
    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const data = await getCatalog();
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    // Генератор скелетонів
    const renderSkeletons = (count = 6) => {
        return Array.from({ length: count }, (_, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
                <Skeleton variant="rectangular" width="100%" height={180} />
                <Skeleton width="60%" sx={{ mt: 1 }} />
                <Skeleton width="40%" />
            </div>
        ));
    };

    return (
        <div className={catalogStyles.catalogContainer}>
            <main className={catalogStyles.mainContent}>
                {isHydrated ? (
                    loading
                        ? renderSkeletons()
                        : games.map((game) => (
                            <GameItem key={game.id} data={game} />
                        ))
                ) : null}
            </main>

            <aside className={catalogStyles.sidebar}>
                <FiltersPanel />
            </aside>
        </div>
    );
};

export default Catalog;
