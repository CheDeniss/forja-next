// import usStyles from "./UserStats.module.scss";
// import GameCollector from "../../Profile/UserStats/GameCollector/GameCollector";
// import AchievementsDisplay from "../../Profile/UserStats/AchivementsCount/AchivementsDisplay";
// import FriendsList from "../../Profile/UserStats/FriendsList/FriendsList";
// import React from "react";
//
//
// const UserStats = () => {
//     return (
//         <div className={usStyles.statsContainer}>
//             <span className={usStyles.statsContainerName}>User Statistics</span>
//             <div className={usStyles.statsContainerMain}>
//                 <div className={usStyles.leftSide}>
//                     <div className={usStyles.statsContainerMainItem}>
//                         <span className={usStyles.ItemContainerName}>game collector</span>
//                         <GameCollector/>
//                     </div>
//
//                     <div className={usStyles.statsContainerMainItem}>
//                         <span className={usStyles.ItemContainerName}>achievements count</span>
//                         <AchievementsDisplay/>
//                     </div>
//                 </div>
//                 <div className={usStyles.statsContainerMainFrList}>
//                     <span className={usStyles.ItemContainerName}>Friends list</span>
//                     <FriendsList/>
//                 </div>
//             </div>
//         </div>
//         );
//         };
//
//             export default UserStats;

import React, { useLayoutEffect, useRef } from "react";
import usStyles from "./UserStats.module.scss";
import GameCollector from "../../Profile/UserStats/GameCollector/GameCollector";
import AchievementsDisplay from "../../Profile/UserStats/AchivementsCount/AchivementsDisplay";
import FriendsList from "../../Profile/UserStats/FriendsList/FriendsList";

const UserStats = () => {
    const leftSideRef = useRef(null);
    const friendsListRef = useRef(null);
    const friendsListNameRef = useRef(null);

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (leftSideRef.current && friendsListRef.current && friendsListNameRef.current) {
                requestAnimationFrame(() => {
                    const leftHeight = leftSideRef.current.offsetHeight;
                    const titleHeight = friendsListNameRef.current.offsetHeight;
                    const computedStyle = window.getComputedStyle(friendsListNameRef.current);
                    const textMargin = parseInt(computedStyle.marginBottom) || 0;

                    const finalHeight = leftHeight - titleHeight - textMargin;
                    // console.log("updateHeight");
                    // console.log("left:", leftHeight);
                    // console.log("text (title):", titleHeight);
                    // console.log("text margin:", textMargin);
                    // console.log("expected friends height:", finalHeight);

                    friendsListRef.current.style.height = `${finalHeight}px`;
                });
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <div className={usStyles.statsContainer}>
            <span className={usStyles.statsContainerName}>User Statistics</span>
            <div className={usStyles.statsContainerMain}>
                <div className={usStyles.leftSide} ref={leftSideRef}>
                    <div className={usStyles.statsContainerMainItem}>
                        <span className={usStyles.ItemContainerName}>game collector</span>
                        <GameCollector />
                    </div>

                    <div className={usStyles.statsContainerMainItem}>
                        <span className={usStyles.ItemContainerName}>achievements count</span>
                        <AchievementsDisplay />
                    </div>
                </div>
                <div className={usStyles.statsContainerMainFlItem}>
                    <span className={usStyles.ItemContainerName} ref={friendsListNameRef}>
                        Friends list
                    </span>
                    <div className={usStyles.statsContainerMainFrList} ref={friendsListRef}>
                        <FriendsList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
