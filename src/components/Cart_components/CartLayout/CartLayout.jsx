'use client';

import styles from './Cart.module.scss';
import { useTranslation } from 'react-i18next';
import CartItem from "@/components/Cart_components/CartItem/CartItem.jsx";
import SummaryBlock from "@/components/Cart_components/SummaryBlock/SummaryBlock.jsx";

const CartLayout = ({cart}) => {
    const { t } = useTranslation(['cart']);

    const price = cart.cartItems.reduce((sum, item) => sum + (item.originalPrice || 0), 0);
    const discount = cart.cartItems.reduce((sum, item) => {
        if (!item.totalDiscountValue || !item.originalPrice) return sum;
        return sum + (item.originalPrice * item.totalDiscountValue / 100);
    }, 0);

    return (
        <div className={styles.cartContainer}>
            <div className={styles.mainContent}>
                <div className={styles.cartItemsList}>
                    {cart.cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <div className={styles.rightSection}>
                <SummaryBlock
                    total={cart.totalAmount}
                    price={price}
                    discount={discount}
                    onCheckout={() => console.log('checkout')}
                />
            </div>
        </div>
    );
};

export default CartLayout;
