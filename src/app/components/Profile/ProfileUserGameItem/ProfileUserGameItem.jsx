import React from 'react';
import styles from './ProfileUserGameItem.module.scss';

const ProfileUserGameItem = ({ game }) => {
    return (
        <div className={styles.wrapper}>
            {/* Зображення гри */}
            <img src={game.imageUrl} alt={game.title} className={styles.gameImage} />

            {/* Інформація про гру */}
            <div className={styles.details}>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${game.achievementProgress}%` }} />
                    <span className={styles.progressText}>
            Achievement Progress: {game.achievementProgress}%
          </span>
                </div>

                <div className={styles.title}>{game.title}</div>

                <div className={styles.actions}>
                    <button className={styles.uninstall}>UNINSTALL</button>
                    <button className={styles.play}>PLAY</button>
                </div>

                <div className={styles.playInfo}>
                    Last played on {game.lastPlayed}
                    <br />
                    {game.playtime} hrs on record
                </div>
            </div>

            {/* Досягнення та DLC */}
            <div className={styles.sideInfo}>
                <div className={styles.achievements}>
                    <span className={styles.label}>Achievements</span>
                    <div className={styles.achievementIcons}>
                        {game.achievements.slice(0, 3).map((ach, index) => (
                            <img key={index} src={ach} alt={`Achievement ${index}`} />
                        ))}
                        <span className={styles.more}>more</span>
                    </div>
                    <div className={styles.total}>{game.achievementsUnlocked}/{game.achievementsTotal} Achievements</div>
                </div>

                <div className={styles.dlc}>
                    <span className={styles.label}>DLC Owned:</span>
                    <div className={styles.dlcBox}>🎁 DLC</div>
                    <div className={styles.total}>{game.dlcOwned}/{game.dlcTotal}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUserGameItem;
