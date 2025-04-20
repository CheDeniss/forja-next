'use client';

import React, { useEffect, useState } from 'react';
import styles from './UserLibraryAchieveModal.module.scss';
import MinioImage from '@/app/components/ui/MinioImage/MinioImage.jsx';
import lockedIcon from '@/../public/assets/images/profile/lock_achivment.svg';
import { getGameAchievements } from "@/api/profileService.js";

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
                        <div key={ach.id} className={styles.achievementCard} style={unlocked ? {} : { borderColor: '#ff4c4c', borderWidth: '2px', borderStyle: 'solid' }}>
                            <div className={styles.imageWrapper}>
                                <MinioImage
                                    src={unlocked ? ach.logoUrl : lockedIcon}
                                    alt={unlocked ? ach.name : "Locked"}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.text}>
                                <div className={styles.title}>
                                    {unlocked ? ach.name : "?? Locked"}
                                </div>
                                <div className={styles.description}>
                                    {unlocked ? ach.description : "Something's lurking. You just don’t see it yet."}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserLibraryAchieveModal;
