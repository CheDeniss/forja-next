import React from "react";
import styles from "./BorderedComponent.module.scss";

const BorderedComponent = ({ children }) => {
    return (
        <div className={styles.borderedContainer}>
            {children}
            <div className={styles.inputBorderPadding}></div>
            <div className={styles.inputBorder}></div>
            <div className={`${styles.cornerCover} ${styles.horizontal}`}></div>
            <div className={`${styles.cornerCover} ${styles.horizontal} ${styles.bottom}`}></div>
            <div className={`${styles.cornerCover} ${styles.vertical}`}></div>
            <div className={`${styles.cornerCover} ${styles.vertical} ${styles.right}`}></div>
        </div>
    );
};

export default BorderedComponent;
