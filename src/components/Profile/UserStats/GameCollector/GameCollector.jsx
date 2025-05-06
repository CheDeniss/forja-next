import React, { useEffect, useState } from 'react';
import gcStyles from './GameCollector.module.scss';
import { getUserStatistics } from '../../../../api/profileService.js';

const GameCollector = ({ userId }) => {
    const [userStatData, setUserStatData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserStatistics(userId).then((data) => {
            setUserStatData(data);
            setLoading(false);
        });
    }, [userId]);

    if (loading) {
        return <div className={gcStyles.loading}>Loading user stats...</div>;
    }

    return (
        <div className={gcStyles.gcContainer}>
            <div className={gcStyles.mainBlock}>
                <ul className={gcStyles.gcList}>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>{userStatData?.gamesOwned || 0}</span>
                            <span className={gcStyles.gcItemName}>Games Owned</span>
                        </div>
                    </li>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>{userStatData?.dlcOwned || 0}</span>
                            <span className={gcStyles.gcItemName}>DLC Owned</span>
                        </div>
                    </li>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>{userStatData?.whishlisted || 0}</span>
                            <span className={gcStyles.gcItemName}>Wishlisted</span>
                        </div>
                    </li>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>{userStatData?.follows || 0}</span>
                            <span className={gcStyles.gcItemName}>Follows</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default GameCollector;
