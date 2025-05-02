import React from 'react';
import styles from './ProfileUserGameItem.module.scss';
import GameAchieve
    from "@/app/components/Profile/GameLibrary/ProfileUserGameItem/GameDlcAchive/GameAchive/GameAchieve.jsx";
import GameDlc from "@/app/components/Profile/GameLibrary/ProfileUserGameItem/GameDlcAchive/GameDlc/GameDlc.jsx";
import AchievementProgress
    from "@/app/components/Profile/GameLibrary/ProfileUserGameItem/GameInfo/AchievementProgress/AchievementProgress.jsx";
import MinioImage from "@/app/components/ui/MinioImage/MinioImage.jsx";
import BorderedComponent from "@/app/components/ui/BorderedComponent/BorderedComponent.jsx";
const ProfileUserGameItem = ({ game }) => {

    const progress = game.totalGameAchievements > 0
        ? Math.round((game.completedAchievements.length / game.totalGameAchievements) * 100)
        : 0;

    return (
        <div className={styles.container}>
                <div className={styles.left}>
                    <BorderedComponent cornerWidth='10%' cornerHeight='12%'>
                        <MinioImage src={game.game.logoUrl} alt="Game Logo"/>
                    </BorderedComponent>
                </div>


                <BorderedComponent cornerWidth='10%' cornerHeight='12%'>
                    <div className={styles.center}>
                        <div>
                            <AchievementProgress progress={progress}/>
                            <span className={styles.title}>{game.game.title}</span>
                        </div>
                    </div>
                </BorderedComponent>

                <div className={styles.right}>
                    <BorderedComponent cornerWidth='10%' cornerHeight='12%'>
                        <div className={styles.rightContent}>
                            <GameAchieve achievements={game.completedAchievements}
                                         total={game.totalGameAchievements}
                                         gameId={game.game.id}/>
                            <GameDlc addons={game.addons}/>
                        </div>
                    </BorderedComponent>
                </div>
        </div>
);
};

export default ProfileUserGameItem;
