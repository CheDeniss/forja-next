import React from 'react';
import styles from './PriceBuyBlock.module.scss';
import DiscountOldPriceBlock from "../../DiscountOldPriceBlock/DiscountOldPriceBlock.jsx";

const PriceBuyBlock = ({ productPrice, discountValue = 0, onBuyClick, left = true }) => {

    const finalPrice = discountValue > 0
        ? productPrice - (productPrice * discountValue) / 100
        : productPrice;

    const formattedFinalPrice = finalPrice.toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className={`${styles.priceBuyBlock} ${!left ? styles.right__side : styles.left__side}`}>
            {discountValue > 0 && (
                <DiscountOldPriceBlock discountValue={discountValue} oldPrice={productPrice}/>
            )}
            <div className={styles.finalPriceSection}>
                <span className={styles.finalPrice}>{formattedFinalPrice} $</span>
                <button className={styles.buyButton}
                        onClick={onBuyClick}>
                    BUY
                </button>
            </div>
        </div>
    );
};

export default PriceBuyBlock;