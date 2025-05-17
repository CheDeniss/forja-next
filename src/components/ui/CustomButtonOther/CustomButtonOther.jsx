'use client';

import React from "react";
import styles from "./CustomButtonOther.module.scss";
import { useRouter } from 'next/navigation';

const CustomButtonOther = ({
                               name = "",
                               onClick,
                               children,
                               link = "",
                               width = "",
                               height = "",
                               disabled = false
}) => {
    const router = useRouter();

    const handleClick = (event) => {
        if (disabled) return;
        if (onClick) onClick(event);
        if (link) router.push(link);
    };

    const customStyle = {
        width: width || "100%",
        height: height || "auto"
    };

    return (
        <div className={styles.customButtonMainContainer}>
            <div className={styles.buttonWrapper}>
                <div className={styles.buttonBorder}></div>
                <button
                    id="customButton"
                    className={styles.customButton}
                    style={customStyle}
                    name={name}
                    onClick={handleClick}
                    disabled={disabled}
                >
                    {children || "Кнопка"}
                </button>
            </div>
        </div>
    );
};

export default CustomButtonOther;
