'use client';

import React, { useState } from 'react';
import styles from './CustomButtonSimple.module.css';

const CustomButtonSimple = ({ children, onClick, type = "button", width = "", height = "" }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [captureStatus, setCaptureStatus] = useState("");

    const handleClick = (event) => {
        setIsClicked(true);
        setCaptureStatus('clicked');

        setTimeout(() => {
            setIsClicked(false);
            setCaptureStatus('');
        }, 300);

        if (onClick) {
            onClick(event);
        }
    };

    const customStyle = {
        width: width || "100%",
        height: height || "auto"
    };

    return (
        <div style={customStyle} className={styles.container}>
            <button
                type={type}
                className={`${styles.button} ${captureStatus === "clicked" ? styles.clicked : ""}`}
                onClick={handleClick}
            >
                <span className={isClicked ? styles.shrink : ""}>
                  {children || "Кнопка"}
                </span>
            </button>
        </div>
    );
};

export default CustomButtonSimple;
