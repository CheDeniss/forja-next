'use client';

import React, {useEffect, useState} from 'react';
import styles from './CustomButtonForms.module.css';

const CustomButtonForm = ({ text, isRadius = "true", isDisabled = "success", onClick, type="button"}) => {
    const [isProblem, setIsProblem] = useState(""); // Якщо у формі є помилка, то кнопка стає червоною
    const [isClicked, setIsClicked] = useState(false);
    const [captureStatus, setCaptureStatus] = useState(""); //

    useEffect(() => {
        setIsProblem(isDisabled);
    }, [isDisabled]);

    const handleClick = (event) => {
        setIsClicked(true);
        setCaptureStatus(isProblem)
        setTimeout(() => setIsClicked(false), 200); // Час анімації шріфта

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

export default CustomButtonForm;
