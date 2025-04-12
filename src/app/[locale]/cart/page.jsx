'use client';

import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useTranslation } from 'react-i18next';
import { getCart } from '../../../api/cartService';
import Loader from "../../components/ui/Loader/Loader.jsx"; // твій метод

const Cart = () => {
    const { t } = useTranslation(['cart']);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getCart();
                setCart(data);
            } catch (err) {
                alert('Помилк');
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    if (!cart || loading) {
        return <Loader loading={loading} />;
    }

    if (cart.cartItems.length === 0) return <div className={styles.empty}>{t('cart:empty')}</div>;

    return (
        <div className={styles.cartContainer}>
            <h1>{t('cart:title', 'Cart')}</h1>

            <div className={styles.cartItemsList}>
                {cart.cartItems.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                        <img src={item.logoUrl} alt={item.title} className={styles.itemImage} />
                        <div className={styles.itemInfo}>
                            <h2 className={styles.itemTitle}>{item.title}</h2>
                            <p className={styles.priceRow}>
                                {item.totalDiscountValue > 0 && (
                                    <span className={styles.oldPrice}>
                                        {item.originalPrice.toFixed(2)} $
                                    </span>
                                )}
                                <span className={styles.finalPrice}>
                                    {item.totalPrice.toFixed(2)} $
                                </span>
                            </p>
                            {item.discountExpirationDate && (
                                <p className={styles.discountNote}>
                                    {t('cart:discountExpires')}: {new Date(item.discountExpirationDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.totalBlock}>
                <span>{t('cart:total')}:</span>
                <strong>{cart.totalAmount.toFixed(2)} $</strong>
            </div>
        </div>
    );
};

export default Cart;
