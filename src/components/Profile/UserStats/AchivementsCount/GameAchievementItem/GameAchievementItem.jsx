import React from 'react';
import itemStyle from './GameAchivementItem.module.scss';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import Tooltip from '@mui/material/Tooltip';
import {useModal} from "@/context/ModalContext.jsx";

const GameAchievementItem = ({ achievement, userId }) => {
    const { showModal } = useModal();

    const {
        name,
        description,
        logoUrl,
    } = achievement.achievement;

    const handleClick = () => {
        showModal({
            modalType: 'user-all-achievements',
            modalProps: { userId }
        });
    };

    return (
        <Tooltip
            title={
                <div>
                    <div style={{fontWeight: 700, fontFamily: "Fixel Display",  fontSize: '18px', marginBottom: '4px'}}>{name}</div>
                    <hr/>
                    <div style={{fontWeight: 400, fontFamily: "Fixel Display", fontSize: '16px'}}>{description}</div>
                </div>
            }
            placement="top"
            componentsProps={{
                popper: {
                    sx: {
                        '& .MuiTooltip-tooltip': {
                            border: '3px solid #E2E2E2',
                            borderRadius: '2px',
                            backgroundColor: '#363636',
                            padding: '10px 12px',
                            maxWidth: 220,
                            color: '#E2E2E2',
                            lineHeight: 1.4,
                        }
                    }
                }
            }}
        >
            <div className={itemStyle.gaItemContainer} onClick={handleClick}>
                <MinioImage src={logoUrl} alt={name}/>
            </div>
        </Tooltip>
    );
};

export default GameAchievementItem;
