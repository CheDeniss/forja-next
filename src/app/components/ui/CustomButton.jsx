'use client';

import React, {useEffect, useState} from 'react';
import styles from '../../styles/ui/CustomButton.module.css';

const CustomButton = ({ text, isRadius = "true", isDisabled = "success", onClick, type="button"}) => {
    const [isProblem, setIsProblem] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [captureStatus, setCaptureStatus] = useState("");

    useEffect(() => {
        setIsProblem(isDisabled);
    }, [isDisabled]);

    const handleClick = (event) => {
        setIsClicked(true);
        setCaptureStatus(isProblem)
        setTimeout(() => setIsClicked(false), 200);

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div>
            <button
                type={type}
                className={`${styles.button} 
                            ${isRadius === "true" ? styles.radius : ""} 
                            ${isProblem  === "success" && isClicked ? styles.success : ""}
                            ${isProblem  === "error" && isClicked ? styles.error : ""}
                            ${captureStatus  === "success" ? styles.success : ""}
                            ${captureStatus  === "error" ? styles.error : ""}`}
                onClick={handleClick}
            >
                <span className={isClicked && isProblem === "success" ? styles.shrink : ""}>{text}</span>
            </button>
        </div>
    );
};

export default CustomButton;
