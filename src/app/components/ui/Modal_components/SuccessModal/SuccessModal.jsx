
import React from 'react';
import styles from './SuccessModal.module.scss';

const SuccessModal = ({ message = 'Operation completed successfully!' }) => {
    return (
        <div className={styles.successModal}>
            <h2 className={styles.title}>Success</h2>
            <p className={styles.message}>{message}</p>
        </div>
    );
};

export default SuccessModal;
