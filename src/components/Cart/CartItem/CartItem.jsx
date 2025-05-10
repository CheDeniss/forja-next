import React, {useEffect} from 'react';
import styles from './CartItem.module.scss';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import {getCart} from "@/api/ClientServices/cartService.js";
import PriceBlock from "@/components/Cart/CartItem/PriceBlock/PriceBlock.jsx";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";

const CartItem = ({ item, onRemove, onOpenStorePage }) => {
    const hasDiscount = item.totalDiscountValue && item.totalDiscountValue > 0;

    return (
        <div className={styles.cartItem}>
            <div className={styles.imageSection}>
                {item.isAddon && (<span className={styles.dlcLabel}>DLC</span>)}
                <MinioImage src={item.logoUrl} alt={item.title}/>
            </div>
            <div className={styles.infoSection}>
                <div className={styles.headerRow}>
                    <div className={styles.textBlock}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.description}>
                            {item.shortDescription}
                        </span>
                    </div>

                    <PriceBlock
                        price={item.totalPrice}
                        originalPrice={item.originalPrice}
                        discountValue={item.totalDiscountValue}
                    />
                </div>

                <div className={styles.actions}>
                    <CustomButtonOther onClick={onOpenStorePage}>{'TO STORE PAGE'}</CustomButtonOther>
                    <CustomButtonOther onClick={() => onRemove(item.id)}>{'REMOVE'}</CustomButtonOther>
                </div>
            </div>
        </div>
    );
};

export default CartItem;


