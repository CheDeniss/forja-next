'use client';

import React, {useState} from "react";
import styles from "./CustomInput.module.scss";
import Eye from "../../../../public/assets/icons/svg/eye.svg"
import EyeOff from "../../../../public/assets/icons/svg/eye_close.svg"
import infoIconError from "../../../../public/assets/icons/svg/info.svg"
import Image from "next/image";

const CustomInput = ({ type, name="", placeholder="", tooltipText = "", value="", onChange, error="" }) => {
    const handleChange = (e) => {
        onChange(name, e.target.value); // Передаємо `name` та `value` у форму
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <div className={styles.customInputMainContainer}>
            <div className={styles.inputWrapper}>
                {/* Проміжний контейнер - зазор */}
                <div className={styles.inputBorderPadding}></div>

                {/* Зовнішня рамка */}
                <div className={`${styles.inputBorder} ${error ? styles.error : ""}`}></div>

                {/* Чотири смуги для перекриття */}
                <div className={`${styles.cornerCover} ${styles.horizontal}`}></div>
                <div className={`${styles.cornerCover} ${styles.horizontal} ${styles.bottom}`}></div>
                <div className={`${styles.cornerCover} ${styles.vertical}`}></div>
                <div className={`${styles.cornerCover} ${styles.vertical} ${styles.right}`}></div>


                {/* Сам input */}
                <div className={styles.inputContainer}>
                    <input
                        id="myInput"
                        className={styles.customInput}
                        type={isPasswordVisible && type === "password" ? "text" : type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                    />
                    {/* Тултіп */}
                    { tooltipText && (
                        <span className={styles.tooltip}>{tooltipText}</span>
                    )}

                    {/* Кнопка для зміни видимості пароля */}
                    {type === "password" && (
                        <Image onClick={togglePasswordVisibility} className={styles.eyeIcon}
                               src={isPasswordVisible ? Eye : EyeOff} alt="eye"/>
                    )}
                </div>
            </div>

            <div>
                {/* Індикатор помилки */}
                {error && (
                    <div className={styles.errorMessage}>
                        <span>{error}</span>
                        <Image className={styles.infoIconError} src={infoIconError} alt="info"/>
                    </div>
                )}
                {!error && (
                    <div className={styles.errorMessageFake}>
                    </div>
                )}
            </div>

        </div>


    );
};

export default CustomInput;
