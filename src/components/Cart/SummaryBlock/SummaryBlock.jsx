import React from 'react';
import styles from './SummaryBlock.module.scss';
import { useTranslation } from 'react-i18next';
import CustomButtonForm from "./CustomButtonForms.jsx";
import {useModal} from "@/context/ModalContext.jsx";

const SummaryBlock = ({ total, price, discount, onCheckout }) => {
    const { t } = useTranslation(['cart']);
    const { showModal } = useModal();

    const handleCheckout = () => {
        showModal({modalType: 'success', modalProps: { message: 'Payment was successful.' } })
    }

    return (
        <div className={styles.summaryBlockWrapper}>
            <div className={styles.summaryBlock}>
                <h2>
                    {t('cart:summary', 'Products')}
                    <br />
                    {t('cart:summarySecondLine', 'Summary')}
                </h2>
                <div className={styles.summaryRows}>
                    <div className={styles.rowData}>
                        <span className={styles.rowName}>{t('cart:price', 'Price')}</span>
                        <span className={styles.rowValue}>{price.toFixed(2)} $</span>
                    </div>
                    <div className={styles.rowData}>
                        <span className={styles.rowName}>{t('cart:sale_disc', 'Sale discount')}</span>
                        <span className={styles.rowValue}>{discount.toFixed(2)} $</span>
                    </div>
                </div>
                <div className={styles.totalRow}>
                    <div className={styles.rowData}>
                        <span className={styles.rowName}>{t('cart:total', 'Subtotal')}</span>
                        <span className={styles.rowValue}>{total.toFixed(2)} $</span>
                    </div>
                </div>
                <div className={styles.buttonBlock}>
                    <CustomButtonForm text={'Check out'} isRadius='false' onClick={handleCheckout}></CustomButtonForm>

                </div>
            </div>
        </div>
    );
};

export default SummaryBlock;
