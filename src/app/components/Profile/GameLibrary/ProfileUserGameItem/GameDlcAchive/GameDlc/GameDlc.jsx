import React from 'react';
import styles from './GameDlc.module.scss';
import { FaBoxOpen } from 'react-icons/fa';

const GameDlc = ({ owned = 0, total = 0 }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>DLC Owned:</h3>
            <div className={styles.icon}><FaBoxOpen size={72} /></div>
            <div className={styles.progress}>{owned}/{total}</div>
        </div>
    );
};

export default GameDlc;
