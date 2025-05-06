
import React from 'react';
import styles from './ErrorModal.module.scss';

const ErrorModal = ({ message = 'Something went wrong.' }) => {
    return (
        <div className={styles.errorModal}>
            <h2 className={styles.title}>Error</h2>
            <p className={styles.message}>{message}</p>
        </div>
    );
};

export default ErrorModal;
