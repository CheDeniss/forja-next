import usStyles from "./UserStats.module.scss";
import GameCollector from "../../Profile/UserStats/GameCollector/GameCollector";
import AchievementsDisplay from "../../Profile/UserStats/AchivementsCount/AchivementsDisplay";
import FriendsList from "../../Profile/UserStats/FriendsList/FriendsList";


const UserStats = () => {
    return (
        <div className={usStyles.statsContainer}>
            <h2>User Statistics</h2>
            <div className={usStyles.statsContainerMain}>
                <div className={usStyles.leftSide}>
                    <GameCollector />
                    <AchievementsDisplay />
                </div>
                    <FriendsList/>
            </div>
        </div>
    );
};

export default UserStats;
