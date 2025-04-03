'use client';

import React, {useState} from "react";
import styles from "./CustomButtonFollow.module.scss";

const CustomButtonFollow = ({ name = "", onClick,  children }) => {
    const [isFollow, setIsFollow] = useState(false);
    const [loading, setLoading] = useState(false);


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

export default CustomButtonFollow;
