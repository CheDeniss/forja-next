import React from 'react';
import styles from './GameAchieve.module.scss';

const GameAchieve = ({ images = [], total = 0, unlocked = 0 }) => {
    const previewImages = images.slice(0, 3);
    const remaining = images.length - 3;

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Achievements</h3>
            <div className={styles.imageGrid}>
                {previewImages.map((src, i) => (
                    <img key={i} src={src} alt={`Achievement ${i + 1}`} className={styles.image} />
                ))}
                {remaining > 0 && <div className={styles.more}>more</div>}
            </div>
            <div className={styles.progress}>{unlocked}/{total} Achievements</div>
        </div>
    );
};

export default GameAchieve;