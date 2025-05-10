'use client';

import React, { useEffect, useState } from 'react';
import styles from './UserLibraryAchieveModal.module.scss';
import MinioImage from '@/components/ui/MinioImage/MinioImage.jsx';
import { getGameAchievements } from "@/api/ClientServices/profileService.js";
import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent.jsx";

const UserLibraryAchieveModal = ({ gameId, completedAchievements = [] }) => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        if (!gameId) return;
        getGameAchievements(gameId)
            .then(setAchievements)
            .catch(console.error);
    }, [gameId]);

    const isUnlocked = (id) => completedAchievements.some(a => a.id === id);

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.grid}>
                {achievements.map((ach) => {
                    const unlocked = isUnlocked(ach.id);

                    return (
                        <div key={ach.id} className={styles.achievementCard}>
                                <div className={styles.imageWrapper}>
                                    <BorderedComponent padding="0">
                                        <MinioImage
                                        src={unlocked ? ach.logoUrl : "/assets/images/profile/lock_achivment.svg"}
                                        alt={unlocked ? ach.name : "Locked"}
                                        className={styles.image}
                                        />
                                    </BorderedComponent>
                                </div>

                            <BorderedComponent borderColor={`${!unlocked ? 'var(--warning-color)' : 'var(--gray-100)'}`} padding="0">
                                <div className={styles.text}>
                                    <div className={styles.title}>
                                        {unlocked ? ach.name : "?? Locked"}
                                    </div>
                                    <div className={styles.description}>
                                        {unlocked ? ach.description : "Something's lurking. You just don’t see it yet."}
                                    </div>
                                </div>
                            </BorderedComponent>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserLibraryAchieveModal;
