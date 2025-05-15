import React from 'react';
import styles from './GameAchieve.module.scss';
import Image from "next/image";
import achImg from "@/../public/assets/images/Game/achivments-icon.svg";

const GameAchieve = ({ gameId, total = 0 }) => {
    return (
        <div className={styles.card}>
            <span className={styles.title}>
                Achivements:
            </span>

            <div className={styles.imgWrapper}>
                <Image src={achImg}
                       alt={'Ach'}
                       fill
                       style={{ objectFit: 'contain' }}/>
            </div>

            <span className={styles.progress}>
                {total}
            </span>
        </div>
    );
};

export default GameAchieve;
