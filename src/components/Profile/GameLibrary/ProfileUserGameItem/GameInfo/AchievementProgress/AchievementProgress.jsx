import React from 'react';
import styles from './AchievementProgress.module.scss';

const AchievementProgress = ({ progress = 0 }) => {
    const clamped = Math.min(100, Math.max(0, progress));
    const gradientStart = clamped;
    const gradientEnd = Math.min(clamped + 10, 100); // 10% зона градієнту

    const gradient = `linear-gradient(
    to right,
    #FF9050 0%,
    #FF9050 ${gradientStart}%,
    #4D4D4D ${gradientEnd}%)`;

    return (
        <div className={styles.container}>
            <div
                className={styles.progressBar}
                style={{ background: gradient }}
            />
            <div className={styles.label}>
                Achievement Progress: {clamped}%
            </div>
        </div>
    );
};

export default AchievementProgress;
