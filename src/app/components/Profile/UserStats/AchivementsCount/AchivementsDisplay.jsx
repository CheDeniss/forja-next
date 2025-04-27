'use client';

import acStyle from "./AchivementsDisplay.module.scss";
import GameAchievementItem from "./GameAchievementItem/GameAchievementItem.jsx";
import { useEffect, useState } from "react";
import { getUserGameAchievementsNum } from "@/api/profileService.js";

const AchievementsDisplay = ({ userId }) => {
    const [lastAchievements, setLastAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const cellsCount = 4;

    useEffect(() => {
        setLoading(true); // увімкнути перед запитом

        getUserGameAchievementsNum(userId, cellsCount)
            .then((data) => {
                setLastAchievements(data || []);
            })
            .catch((error) => {
                console.error('Error fetching ach:', error);
            })
            .finally(() => {
                console.log('Achievements list fetched successfully');
                setLoading(false);
            });
    }, [userId]);

    return (
        <div className={acStyle.achievementContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                lastAchievements.map((achievement) => (
                    <GameAchievementItem key={achievement.id}
                                         achievement={achievement}
                                         userId={userId}
                    />
                ))
            )}
        </div>
    );
};

export default AchievementsDisplay;
