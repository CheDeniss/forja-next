import React from 'react';
import styles from './GameDlc.module.scss';
import Image from "next/image";
import dlcImg from "@/../public/assets/images/Game/DlcOwned.svg";
import {useRouter} from "next/navigation";

const GameDlc = ({ gameId, total = 0 }) => {
    const router = useRouter();

    return (
        <div className={styles.card}>
            <span className={styles.title}>
                DLC:
            </span>

            <div className={styles.imgWrapper}>
                <Image src={dlcImg}
                       alt={'DLC'}
                       fill
                       style={{ objectFit: 'contain' }}/>
                       onClick={() => router.push(`/catalog/${gameId}`)}
            </div>

            <span className={styles.progress}>
                {total}
            </span>
        </div>
    );
};

export default GameDlc;
