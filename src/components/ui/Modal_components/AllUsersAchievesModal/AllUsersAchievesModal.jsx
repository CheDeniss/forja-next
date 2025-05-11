'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/components/ui/Modal_components/UserLibraryAchieveModal/UserLibraryAchieveModal.module.scss';
import MinioImage from '@/components/ui/MinioImage/MinioImage.jsx';
import { getUserAchievements } from "@/api/ClientServices/profileService.js";
import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent.jsx";

const AllUsersAchievesModal = ({ userId }) => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        if (!userId) return;
        getUserAchievements(userId)
            .then(setAchievements)
            .catch(console.error);
    }, [userId]);

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.grid}>
                {achievements.map((ach) => {
                    return (
                        <div key={ach.id} className={styles.achievementCard}>
                            <div className={styles.imageWrapper}>
                                <BorderedComponent padding="0">
                                    <MinioImage
                                        src={ ach.achievement.logoUrl }
                                        alt={ ach.achievement.name || 'No img' }
                                        className={styles.image}
                                    />
                                </BorderedComponent>
                            </div>

                            <BorderedComponent padding="0">
                                <div className={styles.text}>
                                    <div className={styles.title}>
                                        { ach.achievement.name || 'No name' }
                                    </div>
                                    <div className={styles.description}>
                                        { ach.achievement.description || 'No description' }
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

export default AllUsersAchievesModal;
