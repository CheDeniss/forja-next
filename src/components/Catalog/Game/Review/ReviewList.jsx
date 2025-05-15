'use client';

import ReviewItem from './ReviewItem/ReviewItem.jsx';
import styles from './ReviewList.module.scss';
import React, { useEffect, useState } from 'react';
import CustomButtonOther from '@/components/ui/CustomButtonOther/CustomButtonOther.jsx';
import { GetAllReviewsForGame } from '@/api/ClientServices/gameService.js';
import { Skeleton, Pagination } from '@mui/material';

export default function ReviewList({ gameId, gameName }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10); // За замовчуванням 10, як у тебе в даних

    useEffect(() => {
        const loadReviews = async () => {
            try {
                setLoading(true);
                const response = await GetAllReviewsForGame(gameId, page, pageSize);
                setReviews(response.items || []);
                setTotalCount(response.totalCount || 0);
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
                setError('Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };

        if (gameId) {
            loadReviews();
        }
    }, [gameId, page]);

    const renderSkeletons = (count = 3) =>
        Array.from({ length: count }, (_, index) => (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
                <Skeleton variant="rectangular" sx={{ height: '244px', width: '100%' }} />
            </div>
        ));

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className={styles.reviewList}>
            <div className={styles.header}>
                <span className={styles.blockName}>{`REVIEWS FOR GAME ${gameName}`}</span>
                <CustomButtonOther>Add review</CustomButtonOther>
            </div>

            {loading && renderSkeletons()}

            {error && <span className="no_Items_Founds">{error}</span>}

            {!loading && !error && reviews.length === 0 && (
                <span className="no_Items_Found">No comments yet</span>
            )}

            {!loading && !error && reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}

            {!loading && !error && totalPages > 1 && (
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
}
