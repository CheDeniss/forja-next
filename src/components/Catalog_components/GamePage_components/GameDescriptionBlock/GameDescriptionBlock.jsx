'use client';

import React, { useMemo } from 'react';
import styles from './GameDescriptionBlock.module.scss';

const GameDescriptionBlock = ({ description, systemRequirements }) => {
    const parsedRequirements = useMemo(() => {
        try {
            return JSON.parse(systemRequirements);
        } catch (e) {
            console.error('Invalid systemRequirements JSON:', e);
            return { minimum: {}, recommended: {} };
        }
    }, [systemRequirements]);

    const renderRequirementList = (data) => {
        if (!data || typeof data !== 'object') return null;

        return Object.entries(data).map(([key, value]) => (
            <div key={key} className={styles.reqRecord}>
                <span>{key.toUpperCase()}:</span><br />
                &nbsp;&nbsp;&nbsp;<span>{value}</span>
            </div>
        ));
    };


    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <span className={styles.blockName}>ABOUT THIS GAME</span>
                <span className={styles.desc}>{description}</span>
            </div>

            <div className={styles.requirements}>
                <span className={styles.blockName}>SYSTEM REQUIREMENTS</span>

                <div className={styles.reqBlocks}>
                    <div className={styles.min}>
                        <p className={styles.tetleBlock}>MINIMUM:</p>
                        {renderRequirementList(parsedRequirements.minimum)}
                    </div>
                    <div className={styles.rec}>
                        <p className={styles.tetleBlock}>RECOMMENDED:</p>
                        {renderRequirementList(parsedRequirements.recommended)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDescriptionBlock;
