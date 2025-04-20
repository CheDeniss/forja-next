import React from 'react';
import styles from './GameDlc.module.scss';
import Image from "next/image";
import dlcImg from "@/../public/assets/images/profile/DlcOwned.svg";

const GameDlc = ({ addons = [], total = 0 }) => {
    const owned = addons?.length || 0;
    return (
        <div className={styles.card}>
            <span className={styles.title}>
                DLC Owned:
            </span>

            <div className={styles.imgWrapper}>
                <Image src={dlcImg}
                       alt={'DLC'}
                       fill
                       style={{ objectFit: 'contain' }}/>
            </div>

            <span className={styles.progress}>
                {owned}
            </span>
        </div>
    );
};

export default GameDlc;
