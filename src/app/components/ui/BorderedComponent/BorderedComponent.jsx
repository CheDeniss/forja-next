'use client';

import React from "react";
import styles from "./BorderedComponent.module.scss";

const BorderedComponent = ({
                               children,
                               cornerWidth = '15%',
                               cornerHeight = '20%',
                               padding = '3px'
                           }) => {
    const customVars = {
        '--corner-width': cornerWidth,
        '--corner-height': cornerHeight,
        '--bordered-padding': padding
    };

    return (
        <div className={styles.borderedMainContainer} style={customVars}>
            <div className={styles.borderedWrapper}>
                <div className={styles.borderedClip}></div>
                <div className={styles.borderedContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BorderedComponent;
