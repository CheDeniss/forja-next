'use client';

import ReviewItem from './ReviewItem/ReviewItem.jsx';
import styles from './ReviewList.module.scss';
import React, { useEffect, useState } from 'react';
import CustomButtonOther from '@/components/ui/CustomButtonOther/CustomButtonOther.jsx';
import {GetAllReviewsForGame, SubmitReviewForGame} from '@/api/ClientServices/gameService.js';
import { Skeleton, Pagination } from '@mui/material';
import {useModal} from "@/context/ModalContext.jsx";
import {useAuth} from "@/context/AuthContext.js";
import {addToCart} from "@/api/ClientServices/cartService.js";

export default function ReviewList({ gameId, gameName }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10); // За замовчуванням 10, як у тебе в даних
    const { showModal, hideModal } = useModal();
    const { user, isAuthLoading } = useAuth();

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

    const handleReviewSubmit = async (reviewData) => {
        console.log('Submitting review:', reviewData);

        if (!user.id) {
            hideModal();
            console.error('Failed get user');
            setError('Uh-oh! We have a problem with your account. Please contact support.');
            return;
        }

        try {
            setLoading(true);
            await SubmitReviewForGame({
                userId: user.id,
                productId: gameId,
                positiveRating: reviewData.recommend,
                comment: reviewData.reviewText,
                createdAt: new Date().toISOString(),
            });

            const response = await GetAllReviewsForGame(gameId, page, pageSize);
            setReviews(response.items || []);
            setTotalCount(response.totalCount || 0);

            hideModal();
            showModal({ modalType: 'success', modalProps: { message: 'Thanks! Your review will appear after a quick check.' } });
        } catch (err) {
            console.error('Failed to submit review:', err);
            showModal({ modalType: 'error', modalProps: { message: 'Uh-oh! We couldn’t submit your review. Give it another shot!' } });
        } finally {
            setLoading(false);
        }
    };

    const handleAddReview = () => {
        const openReviewModal = () => {
            showModal({
                modalType: 'review',
                modalProps: { onClose: hideModal, onSubmit: handleReviewSubmit },
            });
        };

        if (!user && !isAuthLoading) {
            showModal({
                modalType: 'login',
                modalProps: {
                    onSuccess: async () => {
                        hideModal();
                        openReviewModal();
                    },
                },
            });
            return;
        }

        openReviewModal();
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className={styles.reviewList}>
            <div className={styles.header}>
                <span className={styles.blockName}>{`REVIEWS FOR GAME ${gameName}`}</span>
                <div><CustomButtonOther onClick={handleAddReview}>Add review</CustomButtonOther></div>
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
