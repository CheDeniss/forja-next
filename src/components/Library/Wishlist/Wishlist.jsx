'use client';

import React, { useState, useEffect, useMemo } from 'react';
import WishlistGameItem from "@/components/Library/Wishlist/WishlistGameItem/WishlistGameItem.jsx";
import styles from './Wishlist.module.scss';
import { Skeleton, Pagination } from "@mui/material";
import { getWishlist } from "@/api/ClientServices/libraryService.js";

const Wishlist = ({ filters }) => {
    const [allWishlistItems, setAllWishlistItems] = useState([]); // Всі ігри з бекенду
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getWishlist();
                setAllWishlistItems(response);
                setPage(1);
            } catch (err) {
                console.error('Failed to fetch wishlist:', err);
                setError('Failed to load wishlist.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const filteredWishlistItems = useMemo(() => {
        if (!filters) return allWishlistItems;

        return allWishlistItems.filter(item => {
            const { game } = item;
            if (!game) return false;

            // Пошук по тексту
            if (filters.search && !game.title.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // Жанри
            if (filters.genres.length > 0 && !game.genres.some(g => filters.genres.includes(g.id))) {
                return false;
            }

            // Механіки
            if (filters.mechanics.length > 0 && !game.achievements.some(m => filters.mechanics.includes(m.id))) {
                return false;
            }

            // Теги
            if (filters.tags.length > 0 && !game.genres.some(t => filters.tags.includes(t.id))) {
                return false;
            }

            // Контент 18+ (matureContents)
            if (filters.matureContents.length > 0 && !game.genres.some(m => filters.matureContents.includes(m.id))) {
                return false;
            }

            return true;
        });
    }, [allWishlistItems, filters]);

    const paginatedItems = useMemo(() => {
        const startIndex = (page - 1) * pageSize;
        return filteredWishlistItems.slice(startIndex, startIndex + pageSize);
    }, [filteredWishlistItems, page]);

    const totalPages = Math.ceil(filteredWishlistItems.length / pageSize);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height={200} style={{ marginBottom: '20px' }} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <span className="no_Items_Found">
                {styles.error}
            </span>
        );
    }

    if (filteredWishlistItems.length === 0) {
        return (
            <span className="no_Items_Found">
                No games found in wishlist
            </span>
        );
    }

    return (
        <div className={styles.container}>
            {paginatedItems.map((item) => (
                <WishlistGameItem
                    key={item.id}
                    wishlistItem={item}
                />
            ))}

            {totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            )}
        </div>
    );
};

export default Wishlist;
