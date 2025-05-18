'use client';

import React from 'react';
import styles from './SpecialOffers.module.scss';
import { useRouter } from 'next/navigation';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import {getLocaleFromCookie} from "@/utils/locale.js";

const MAX_TILES = 5;
const DEFAULT_PLACEHOLDER_IMAGE = '/assets/fallbacks/ComingSoon.svg';

const getRandomGames = (games, count) => {
    const shuffled = [...games].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const formatDiscount = (discount) => {
    if (!discount) return '';
    return discount.discountType === 'Percentage'
        ? `-${discount.discountValue}%`
        : `-₴${discount.discountValue}`;
};

const SpecialOffers = ({ games = [] }) => {
    const router = useRouter();
    const selectedGames = getRandomGames(games, MAX_TILES);

    const filledGames = [
        ...selectedGames,
        ...Array.from({ length: MAX_TILES - selectedGames.length }, (_, i) => ({
            id: `placeholder-${i}`,
            title: 'Coming soon...',
            logoUrl: DEFAULT_PLACEHOLDER_IMAGE,
            isPlaceholder: true,
        }))
    ];

    const handleClick = (game) => {
        if (game.isPlaceholder) return;
        const locale = getLocaleFromCookie();
        const url = `/${locale}/catalog/${game.id}`;
        window.open(url, '_blank');
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.left} ${!filledGames[0].isPlaceholder ? styles.clickable : ''}`}
                onClick={() => handleClick(filledGames[0])}
            >
                <div className={styles.imageWrapper}>
                    <MinioImage
                        className={styles.image}
                        filled
                        src={filledGames[0].logoUrl}
                        alt={filledGames[0].title}
                    />

                    {!filledGames[0].isPlaceholder && filledGames[0].activeDiscount && (
                        <div className={styles.discountTag}>
                            {formatDiscount(filledGames[0].activeDiscount)}
                        </div>
                    )}
                </div>
                <div className={styles.title}>
                    {!filledGames[0].isPlaceholder && filledGames[0].activeDiscount ? filledGames[0].title : "COMING SOON"}
                </div>
            </div>

            <div className={styles.right}>
                {filledGames.slice(1).map((game) => (
                    <div
                        key={game.id}
                        className={`${styles.tile} ${!game.isPlaceholder ? styles.clickable : ''}`}
                        onClick={() => handleClick(game)}
                    >
                        <div className={styles.imageWrapper}>
                            <MinioImage
                                className={styles.image}
                                filled
                                src={game.logoUrl}
                                alt={game.title}
                            />
                            {!game.isPlaceholder && game.activeDiscount && (
                                <div className={styles.discountTag}>
                                    {formatDiscount(game.activeDiscount)}
                                </div>
                            )}
                        </div>

                        <div className={styles.title}>
                            {!game.isPlaceholder && game.activeDiscount ? game.title : "COMING SOON"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialOffers;

