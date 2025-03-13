import React from 'react';
import gcStyles from './GameCollector.module.scss';

const GameCollector = () => {
    return (
        <div className={gcStyles.gcContainer}>
            <span className={gcStyles.gcContainerName}>game collector</span>
            <div className={gcStyles.mainBlock}>
                <ul className={gcStyles.gcList}>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>21</span>
                            <span className={gcStyles.gcItemName}>Games Owned</span>
                        </div>
                    </li>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>6</span>
                            <span className={gcStyles.gcItemName}>DLC Owned</span>
                        </div>
                    </li>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>3</span>
                            <span className={gcStyles.gcItemName}>Whishlisted</span>
                        </div>
                    </li>
                    <li className={gcStyles.gcItemLi}>
                        <div className={gcStyles.gcItem}>
                            <span className={gcStyles.gcItemCount}>4</span>
                            <span className={gcStyles.gcItemName}>Follows</span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default GameCollector;
