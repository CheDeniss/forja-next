'use client';

import React from 'react';
import styles from './GameHeroSection.module.scss';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import fallback from '../../../../../../public/assets/fallbacks/NoImage.svg';
import PriceBuyBlock from "../PriceBuyBlock/PriceBuyBlock.jsx";
import {addToCart} from "../../../../../api/cartService.js";

const GameHeroSection = ({ game }) => {
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

    // const testImages = [
    //     'https://picsum.photos/id/1018/600/400',
    //     'https://picsum.photos/id/1025/600/400',
    //     'https://picsum.photos/id/1035/600/400',
    //     'https://picsum.photos/id/1042/600/400',
    //     'https://picsum.photos/id/1050/600/400',
    //     'https://picsum.photos/id/1051/600/400',
    //     'https://picsum.photos/id/1052/600/400',
    //     'https://picsum.photos/id/1053/600/400',
    //     'https://picsum.photos/id/1054/600/400',
    //     'https://picsum.photos/id/1055/600/400',
    //     'https://picsum.photos/id/1056/600/400',
    //     'https://picsum.photos/id/1057/600/400',
    //     'https://picsum.photos/id/1058/600/400',
    // ];

    const addProdToCart = async (productId) => {
        try {
            await addToCart(productId);
            alert("Товар додано до кошика!");
        } catch (e) {
            console.error(e);
            alert("Не вдалося додати товар.");
        }
    }

    const totalReviews = positiveReviewsCount + negativeReviewsCount;
    const rating = totalReviews > 0
        ? `${((positiveReviewsCount / totalReviews) * 100).toFixed(0)}%` : 'N/A';

    return (
        <section className={styles.hero}>
            <div className={styles.leftSection}>
                <div className={styles.mainImage}>
                    <ImageGallery images={images} fallback={logoUrl || fallback} />
                </div>
                <div className={styles.priceBlock}>
                    <PriceBuyBlock gamePrice={price} discountValue={discountValue} onBuyClick={() => {addProdToCart(id)}} />
                    <button className={styles.wishlistButton}>Add to Wishlist</button>
                </div>
            </div>

            <div className={styles.rightSection}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{shortDescription}</p>

                <div className={styles.meta}>
                    <div><strong>AGE:</strong> {minimalAge}+</div>
                    <div><strong>REVIEWS:</strong> {totalReviews} ({rating} positive)</div>
                    <div><strong>GENRE:</strong> {genres.map(g => g.name).join(', ')}</div>
                    <div><strong>DEVELOPER:</strong> {developer}</div>
                    <div><strong>RELEASE DATE:</strong> {new Date(releaseDate).toLocaleDateString()}</div>
                    <div><strong>TAGS:</strong> {tags.map(t => t.title).join(', ')}</div>
                </div>
            </div>
        </section>
    );
};

export default GameHeroSection;
