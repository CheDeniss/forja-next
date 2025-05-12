
import React from 'react';
import styles from './GameAchieve.module.scss';
import MinioImage from '@/components/ui/MinioImage/MinioImage.jsx';
import {useModal} from "@/context/ModalContext.jsx";

const GameAchieve = ({ achievements = [], total = 0,  gameId }) => {
    const { showModal } = useModal();

    const unlocked = achievements.length;
    const locked = total - unlocked;
    const shown = 3;

    const displayed = [];

    const handleMoreClick = () => {
        showModal({
            modalType: 'user-library-achievements',
            modalProps: {
                gameId,
                completedAchievements: achievements
            }
        });
    };


    // 1. Додаємо відкриті
    achievements.slice(0, shown).forEach((ach) => {
        displayed.push(
            <div key={ach.id} className={styles.box}>
                <MinioImage
                    src={ach.logoUrl}
                    alt={ach.name}
                    className={styles.image}
                />
            </div>
        );
    });

    // 2. Додаємо закриті
    const lockedToShow = Math.min(shown - displayed.length, locked);
    for (let i = 0; i < lockedToShow; i++) {
        displayed.push(
            <div key={`locked-${i}`} className={styles.box}>
                <MinioImage
                    src="/assets/images/profile/lock_achivment.svg"
                    alt="Locked"
                    className={styles.image}
                />
            </div>
        );
    }

    // 3. Додаємо порожні рамки
    const emptyBoxes = shown - displayed.length;
    for (let i = 0; i < emptyBoxes; i++) {
        displayed.push(
            <div key={`empty-${i}`} className={styles.box}>
                <div className={styles.emptyBox}></div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <span className={styles.title}>Achievements</span>

            <div className={styles.grid}>
                {displayed}

                {/* 4. Mo — завжди останній */}
                <div onClick={handleMoreClick} className={styles.moreBox}>more</div>
            </div>

            <div className={styles.progress}>
                {unlocked}/{total}
            </div>
        </div>
    );
};

export default GameAchieve;
