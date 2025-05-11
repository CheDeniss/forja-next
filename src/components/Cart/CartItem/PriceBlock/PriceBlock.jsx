import React from 'react';
import styles from './PriceBlock.module.scss';

const PriceBlock = ({ price, originalPrice, discountValue }) => {
    const hasDiscount = discountValue != null && originalPrice && price < originalPrice;
    let formattedOriginalPrice;

    if(hasDiscount) {
        formattedOriginalPrice = originalPrice.toLocaleString('uk-UA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    const formattedPrice = price?.toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className={styles.priceBlock}>
            {hasDiscount ? (
                <>
                    <div className={styles.topRow}>
                        <div className={styles.discount}>-{discountValue}%</div>
                        <div className={styles.original}>{formattedOriginalPrice}$</div>
                    </div>
                    <div className={styles.final}>{formattedPrice}$</div>
                </>
            ) : (
                <div className={styles.finalFull}>{formattedPrice}$</div>
            )}
        </div>
    );
};

export default PriceBlock;
