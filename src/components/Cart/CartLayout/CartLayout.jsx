'use client';

import styles from './Cart.module.scss';
import { useTranslation } from 'react-i18next';
import CartItem from "@/components/Cart/CartItem/CartItem.jsx";
import SummaryBlock from "@/components/Cart/SummaryBlock/SummaryBlock.jsx";
import {removeFromCart} from "@/api/ClientServices/cartService.js";
import {useModal} from "@/context/ModalContext.jsx";
import {useState} from "react";

const CartLayout = ({cart_}) => {
    const [cart, setCart] = useState(cart_)
    const { t } = useTranslation(['cart']);
    const { showModal, hideModal } = useModal();

    const price = cart.cartItems.reduce((sum, item) => sum + (item.originalPrice || 0), 0);
    const discount = cart.cartItems.reduce((sum, item) => {
        if (!item.totalDiscountValue || !item.originalPrice) return sum;
        return sum + (item.originalPrice * item.totalDiscountValue / 100);
    }, 0);

    const handleRemoveFromCart = async (itemId) => {
        try {
            await removeFromCart(itemId);
            showModal({ modalType: 'success', modalProps: { message: 'Товар видалено з кошика.' } });
            window.dispatchEvent(new Event("cart-updated"));
            const updatedCart = {
                ...cart,
                cartItems: cart.cartItems.filter(item => item.id !== itemId)
            };
            setCart(updatedCart);
        } catch (e) {
            showModal({ modalType: 'error', modalProps: { message: 'Не вдалося видалити товар.' } });
        }
    };

    return (
        <div className={styles.cartContainer}>
            <div className={styles.mainContent}>
                <div className={styles.cartItemsList}>
                    {cart.cartItems.map(item => (
                        <CartItem key={item.id} item={item} onRemove={handleRemoveFromCart} />
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
