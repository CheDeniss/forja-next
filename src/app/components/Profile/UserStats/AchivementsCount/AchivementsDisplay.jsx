'use client';

import acStyle from "./AchivementsDisplay.module.scss";
import GameAchievementItem from "./GameAchievementItem/GameAchievementItem";

const AchievementsDisplay = () => {

    return (
        <div className={acStyle.achievementContainer}>
            <GameAchievementItem/>
            <GameAchievementItem/>
            <GameAchievementItem/>
            <GameAchievementItem/>
        </div>
    );
};

export default AchievementsDisplay;
