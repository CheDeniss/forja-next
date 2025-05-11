import React from 'react';
import styles from './DiscountOldPriceBlock.module.scss';

const DiscountOldPriceBlock = ({ discountValue, oldPrice }) => {
    const formattedOldPrice = oldPrice?.toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className={styles.discountOldPriceContainer}>
            <div className={styles.discount}>-{discountValue}%</div>
            <div className={styles.oldPrice}>{formattedOldPrice}$</div>
        </div>
    );
};

export default DiscountOldPriceBlock;
