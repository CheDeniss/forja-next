'use client';

import React from "react";
import styles from "./CustomButtonOther.module.scss";

const CustomButtonOther = ({ name = "", onClick,  children }) => {

    const handleClick = (event) => {
       if (onClick) {
            onClick(event);
        }
    };

    return (
        <div className={styles.customButtonMainContainer}>
            <div className={styles.buttonWrapper}>
                <div className={styles.buttonBorder}></div>
                    <button
                        id="customButton"
                        className={styles.customButton}
                        name={name}
                        onClick={handleClick}
                    >
                        {children || "Кнопка"}
                    </button>
                {/*</div>*/}
            </div>
        </div>
    );
};

export default CustomButtonOther;
