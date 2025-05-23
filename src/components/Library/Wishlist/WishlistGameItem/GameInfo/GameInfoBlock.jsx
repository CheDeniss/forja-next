'use client';

import React from "react";
import styles from "./GameInfoBlock.module.scss";
import {useParams, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import {getRatingLabel} from "@/components/Catalog/GetRating/getRating.jsx";
import InfoItemValueWithTooltip from "@/components/ui/TooltipIfvalueOverflowed/InfoItemValueWithTooltip.jsx";
import DiscountOldPriceBlock from "@/components/Catalog/DiscountOldPriceBlock/DiscountOldPriceBlock.jsx";
import CustomButtonSimple from "@/components/ui/CustomButtonSimple/CustomButtonSimple.jsx";

const GameInfoBlock = ({ product }) => {


    const router = useRouter();
    const { locale } = useParams();
    const { t } = useTranslation(['catalog']);

    const lastDiscount = discounts?.length ? discounts[discounts.length - 1] : null;
    const discountValue = lastDiscount?.discountValue || 0;

    const finalPrice = discountValue
        ? price - (price * discountValue) / 100
        : price;

    const formattedFinalPrice = finalPrice.toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

     console.log(data.title, data);

    return (
        <div className={styles.gameItemContainer}>
            <div className={styles.LogoSection}>
                <MinioImage
                    src={logoUrl}
                    alt="Game Logo"
                />
            </div>
            <div className={styles.GameInfoSection}>
                <span className={styles.title}>{title}</span>
                <div className={styles.InfoBlock}>

                    <div className={styles.InfoItemGT}>
                        <span className={styles.InfoItemTitle}>Rating:</span>
                        <span className={styles.InfoItemValue}>
                            {getRatingLabel(positiveRating, negativeRating)}
                        </span>
                    </div>

                    <div className={styles.InfoItemGT}>
                        <span className={styles.InfoItemTitle}>Genre:</span>
                        <InfoItemValueWithTooltip>
                            {genres?.map(g => g.name).join(", ")}
                        </InfoItemValueWithTooltip>
                    </div>

                    <div className={styles.InfoItemGT}>
                        <span className={styles.InfoItemTitle}>Tags:</span>
                        <InfoItemValueWithTooltip>
                            {tags?.map(t => t.title).join(", ")}
                        </InfoItemValueWithTooltip>
                    </div>

                    <div className={styles.InfoItem} style={{width: '100px'}}>
                        <span className={styles.InfoItemTitle}>Release Date:</span>
                        <span className={styles.InfoItemValue}>{new Date(releaseDate).toLocaleDateString()}</span>
                    </div>

                </div>
            </div>

            <div className={styles.GamePriceSection}>
                {(discounts && discounts.length > 0) ? (
                    <>
                        <span className={styles.validPeriod}>SALE ENDS: {new Date(discounts[0].endDate).toLocaleString()}</span>
                        <div className={styles.priceBox}>
                            <DiscountOldPriceBlock discountValue={discounts[discounts.length-1].discountValue}
                                                   oldPrice={price}/>
                            <span className={styles.price}>{formattedFinalPrice} $</span>
                        </div>
                    </>
                ) : (
                    <span className={styles.price}>{formattedFinalPrice} $</span>
                )}
                <CustomButtonSimple height="45%"
                                    onClick={() => {
                                        if (id) router.push(`/${locale}/catalog/${id}`);
                                    }}
                >
                    Play now
                </CustomButtonSimple>

            </div>

        </div>
    );
};

export default GameInfoBlock;
