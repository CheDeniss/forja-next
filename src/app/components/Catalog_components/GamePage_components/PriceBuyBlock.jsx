import React from 'react';
import styles from './PriceBuyBlock.module.scss';
import DiscountOldPriceBlock from "../DiscountOldPriceBlock/DiscountOldPriceBlock.jsx";

const PriceBuyBlock = ({ gamePrice, discountValue = 0, onBuyClick }) => {

    const finalPrice = discountValue > 0
        ? gamePrice - (gamePrice * discountValue) / 100
        : gamePrice;

    const formattedFinalPrice = finalPrice.toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className={styles.priceBuyBlock}>
            {discountValue > 0 && (
                <DiscountOldPriceBlock discountValue={discountValue} oldPrice={gamePrice}/>
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