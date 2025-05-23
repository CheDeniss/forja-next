'use client';

import React from 'react';
import styles from './GameHeroSection.module.scss';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import PriceBuyBlock from "../PriceBuyBlock/PriceBuyBlock.jsx";
import {addToCart} from "@/api/ClientServices/cartService.js";
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import {useAuth} from "@/context/AuthContext.js";
import {useModal} from "@/context/ModalContext.jsx";

//TODO додати іконки на від обмеження, перехід на сторінку гри

const GameHeroSection = ({ game }) => {
    const { user, isAuthLoading } = useAuth();
    const { showModal, hideModal } = useModal();

    const {
        id,
        title,
        shortDescription,
        developer,
        minimalAge,
        price,
        logoUrl,
        releaseDate,
        genres,
        tags,
        discounts = [],
        positiveReviewsCount,
        negativeReviewsCount,
        images = []
    } = game;

    const {
        name,
        discountType,
        discountValue,
        startDate,
        endDate,
    } = discounts[discounts.length - 1] || {};
    console.log('Game fetched:', game);

    const addProdToCart = async (productId) => {
        const performAddToCart = async () => {
            try {
                await addToCart(productId);
                window.dispatchEvent(new Event("cart-updated"));
                showModal({ modalType: 'success', modalProps: { message: 'Товар додано до кошика!' } });
            } catch (e) {
                console.error(e);
                showModal({ modalType: 'error', modalProps: { message: 'Не вдалося додати товар.' } });
            }
        };

        if (user && !isAuthLoading) {
            await performAddToCart();
        } else {
            showModal({
                modalType: 'login',
                modalProps: {
                    onSuccess: async () => {
                        hideModal();
                        await new Promise((resolve) => setTimeout(resolve, 100)); // Можна буде замінити краще
                        await performAddToCart();
                    },
                },
            });
        }
    };

    const totalReviews = positiveReviewsCount + negativeReviewsCount;
    const rating = totalReviews > 0
        ? `${((positiveReviewsCount / totalReviews) * 100).toFixed(0)}%` : 'N/A';

    return (
        <section className={styles.hero}>
            <div className={styles.leftSection}>
                <div className={styles.mainImage}>
                    <ImageGallery images={images} fallback={logoUrl || '@/../public/assets/fallbacks/NoImage.svg'} />
                </div>
                <div className={styles.priceBlock}>
                    <PriceBuyBlock productPrice={price} discountValue={discountValue} onBuyClick={() => {addProdToCart(id)}} />
                    <CustomButtonOther>Add to Wishlist</CustomButtonOther>
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.meta}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.description}>{shortDescription}</span>
                </div>

                <div className={styles.meta}>
                    <div>
                        <span className={styles.label}>AGE:</span><br/>
                        <span className={styles.value}>{minimalAge}+</span>
                    </div>
                    <div>
                        <span className={styles.label}>REVIEWS:</span><br/>
                        <span className={styles.value}>{totalReviews} ({rating} positive)</span>
                    </div>
                    <div>
                        <span className={styles.label}>GENRE:</span><br/>
                        <span className={styles.value}>{genres.map(g => g.name).join(', ')}</span>
                    </div>
                    <div>
                        <span className={styles.label}>DEVELOPER:</span><br/>
                        <span className={styles.value}>{developer}</span>
                    </div>
                    <div>
                        <span className={styles.label}>RELEASE DATE:</span><br/>
                        <span className={styles.value}>{new Date(releaseDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className={styles.label}>TAGS:</span><br/>
                        <span className={styles.value}>{tags.map(t => t.title).join(', ')}</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default GameHeroSection;
