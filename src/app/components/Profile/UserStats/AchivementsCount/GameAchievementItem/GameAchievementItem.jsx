import React from 'react';
import itemStyle from './GameAchivementItem.module.scss';
import withBorder from "../../../../../../hoc/withBorder";

const GameAchievementItem = ({text}) => {
    return (
        <div className={itemStyle.gaItemContainer}>
            <h2>{text}</h2>
        </div>
    );
};

export default GameAchievementItem;

// export default withBorder(GameAchievementItem);
