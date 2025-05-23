'use client';

import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import { useTranslation } from 'react-i18next';
import { getCart } from '../../../api/ClientServices/cartService.js';
import Loader from "@/components/ui/Loader/Loader.jsx";
import CartLayout from "@/components/Cart/CartLayout/CartLayout.jsx";

const Cart = () => {
    const {t} = useTranslation(['common', 'navmenu']); // вибір namespace за потреби
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getCart();
                setCart(data);
            } catch (err) {
                alert('Помилка при завантаженні кошика');
            } finally {
                setLoading(false);
                console.log('Cart fetched:', cart);
            }
        };
        fetchCart();
    }, []);

    if (!cart || loading) {
        return <Loader loading={loading} />;
    }

    if (cart.cartItems.length === 0) {
        return <div className={styles.empty}>{t('cart:empty')}</div>;
    }

    return (
        <div className={styles.cartContainer}>
            <label>My cart</label>
            <CartLayout cart_={cart}/>
        </div>
    );
}

export default Cart;
