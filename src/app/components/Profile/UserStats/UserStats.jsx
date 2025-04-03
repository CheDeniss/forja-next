import React, { useLayoutEffect, useRef, useEffect } from "react";
import usStyles from "./UserStats.module.scss";
import GameCollector from "../../Profile/UserStats/GameCollector/GameCollector";
import AchievementsDisplay from "../../Profile/UserStats/AchivementsCount/AchivementsDisplay";
import FriendsList from "../../Profile/UserStats/FriendsList/FriendsList";

const UserStats = ({ userId }) => {
    const leftSideRef = useRef(null);
    const friendsListRef = useRef(null);
    const friendsListNameRef = useRef(null);

    useEffect(() => {
        const updateHeight = () => {
            if (leftSideRef.current && friendsListRef.current && friendsListNameRef.current) {
                const leftHeight = leftSideRef.current.offsetHeight;
                const titleHeight = friendsListNameRef.current.offsetHeight;
                const computedStyle = window.getComputedStyle(friendsListNameRef.current);
                const textMargin = parseInt(computedStyle.marginBottom) || 0;

                const finalHeight = leftHeight - titleHeight - textMargin;
                friendsListRef.current.style.height = `${finalHeight}px`;
            }
        };

        const resizeObserver = new ResizeObserver(updateHeight);
        if (leftSideRef.current) {
            resizeObserver.observe(leftSideRef.current);
        }

        updateHeight();

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className={usStyles.statsContainer}>
            <span className={usStyles.statsContainerName}>User Statistics</span>
            <div className={usStyles.statsContainerMain}>
                <div className={usStyles.leftSide} ref={leftSideRef}>
                    <div className={usStyles.statsContainerMainItem}>
                        <span className={usStyles.ItemContainerName}>game collector</span>
                        <GameCollector userId={userId} />
                    </div>

                    <div className={usStyles.statsContainerMainItem}>
                        <span className={usStyles.ItemContainerName}>achievements count</span>
                        <AchievementsDisplay userId={userId} />
                    </div>
                </div>
                <div className={usStyles.statsContainerMainFlItem}>
                    <span className={usStyles.ItemContainerName} ref={friendsListNameRef}>
                        Friends list
                    </span>
                    <div className={usStyles.statsContainerMainFrList} ref={friendsListRef}>
                        <FriendsList userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
