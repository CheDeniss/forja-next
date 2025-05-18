'use client';

import React from 'react';
import styles from './WishlistGameItem.module.scss';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent.jsx";
import { Skeleton } from '@mui/material';
import CustomButtonSimple from "@/components/ui/CustomButtonSimple/CustomButtonSimple.jsx";
import { useRouter } from 'next/navigation';
import DiscountOldPriceBlock from "@/components/Catalog/DiscountOldPriceBlock/DiscountOldPriceBlock.jsx";
import GameAchieve from "@/components/Library/Wishlist/WishlistGameItem/RightBlock/GameAchive/GameAchieve.jsx";
import GameDlc from "@/components/Library/Wishlist/WishlistGameItem/RightBlock/GameDlc/GameDlc.jsx";

const WishlistGameItem = ({ wishlistItem }) => {
    const {
        id: wishlistId,
        game,
        totalGameAchievements,
        completedAchievements,
        addons,
    } = wishlistItem;

    if (!game) {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <BorderedComponent cornerWidth="10%" cornerHeight="12%">
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    </BorderedComponent>
                </div>

                <BorderedComponent cornerWidth="10%" cornerHeight="12%">
                    <div className={styles.center}>
                        <Skeleton variant="text" width="90%" height={125} />
                    </div>
                </BorderedComponent>

                <div className={styles.right}>
                    <BorderedComponent cornerWidth="10%" cornerHeight="12%">
                        <div className={styles.rightContent}>
                            <Skeleton variant="text" width="50%" height="100%" />
                            <Skeleton variant="text" width="50%" height="100%" />
                        </div>
                    </BorderedComponent>
                </div>
            </div>
        );
    }

    const {
        id,
        title,
        logoUrl,
        price,
        releaseDate,
        discounts = [],
    } = game;

    const router = useRouter();
    const lastDiscount = discounts.at(-1) || null;
    const discountValue = lastDiscount?.discountValue || 0;

    const finalPrice = discountValue
        ? price - (price * discountValue) / 100
        : price;

    const formattedFinalPrice = finalPrice.toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <BorderedComponent cornerWidth="10%" cornerHeight="12%">
                    <MinioImage src={logoUrl} alt="Game Logo" />
                </BorderedComponent>
            </div>

            <BorderedComponent cornerWidth="10%" cornerHeight="12%">
                <div className={styles.center}>
                    <div className={styles.GameInfoSection}>
                        <span className={styles.title}>{title}</span>

                        <div className={styles.InfoBlock}>
                            <div className={styles.GamePriceSection}>
                                {discounts.length > 0 ? (
                                    <>
                                        <span className={styles.validPeriod}>
                                            SALE ENDS: {new Date(lastDiscount.endDate).toLocaleString()}
                                        </span>
                                        <div className={styles.priceBox}>
                                            <DiscountOldPriceBlock
                                                discountValue={discountValue}
                                                oldPrice={price}
                                            />
                                            <span className={styles.price}>{formattedFinalPrice} $</span>
                                        </div>
                                    </>
                                ) : (
                                    <span className={styles.price}>{formattedFinalPrice} $</span>
                                )}
                                <CustomButtonSimple
                                    height="45%"
                                    onClick={() => router.push(`/catalog/${id}`)}
                                >
                                    Play now
                                </CustomButtonSimple>
                            </div>

                            <div className={styles.InfoItem}>
                                <span className={styles.InfoItemTitle}>Release Date:</span>
                                <span className={styles.InfoItemValue}>
                                    {new Date(releaseDate).toLocaleDateString()}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </BorderedComponent>

            <div className={styles.right}>
                <BorderedComponent cornerWidth="10%" cornerHeight="12%">
                    <div className={styles.rightContent}>
                        <GameAchieve
                            total={totalGameAchievements}
                        />
                        <GameDlc addons={addons?.length || '0'}
                                 gameId={id}
                        />
                    </div>
                </BorderedComponent>
            </div>
        </div>
    );
};

export default WishlistGameItem;
