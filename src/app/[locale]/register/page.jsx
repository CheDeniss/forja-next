'use client';

import React, {useState} from 'react';
import regStyles from './Register.module.css';
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import {registerUser} from "../../../api/authService";
import {validateConfirmPassword, validateEmail, validatePassword} from "../../../../src/utils/validationUtils";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {useParams} from "next/navigation";

import googleIcon from "../../../../public/assets/icons/svg/Google.svg";
import appleIcon from "../../../../public/assets/icons/svg/Apple.svg";
import instIcon from "../../../../public/assets/icons/svg/Instagram.svg";
import fbIcon from "../../../../public/assets/icons/svg/Facebook.svg";
import xIcon from "../../../../public/assets/icons/svg/twiter_ico.svg";
import registerWith from "../../../../public/assets/images/register/Register_with.svg";
import Link from "next/link";

const register = () => {
    const { t } = useTranslation();
    const { locale } = useParams();

    const [tryToCorrect, setTryToCorrect] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        email: "errors.emailRequired",
        password: "errors.passwordRequired",
        confirmPassword: "errors.confirmPasswordRequired"
    });

    const [errorForInput, setErrorForInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [buttonStatus, setButtonStatus] = useState("error"); // Для CustomButton

    const handleChange = (name, value) => {
        setFormData((prevState) => {
            const updatedFormData = { ...prevState, [name]: value };

            if (tryToCorrect) {
                setErrorForInput((prevState) => ({
                    ...prevState,
                    email: "",
                    password: "",
                    confirmPassword: ""
                }));
                setTryToCorrect(false);
            }

            setErrors((prevErrors) => {
                const updatedErrors = {
                    ...prevErrors,
                    email: validateEmail(updatedFormData.email),
                    password: validatePassword(updatedFormData.password),
                    confirmPassword: validateConfirmPassword(updatedFormData.password, updatedFormData.confirmPassword)
                };

                // console.log("errors (оновлені):", updatedErrors);

                const hasErrors = Object.values(updatedErrors).some((error) => error);
                setButtonStatus(hasErrors ? "error" : "success");

                return updatedErrors;
            });

            // console.log("formData (оновлений):", updatedFormData);

            return updatedFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (buttonStatus === "error") {
            setErrorForInput({
                email: errors.email,
                password: errors.password,
                confirmPassword: errors.confirmPassword
            });
            setTryToCorrect(true); // Встановлюємо спробу виправлення помилок і по ній погасимо помилки в handleChange

            return;
        }

        setErrorForInput({
            email: "",
            password: "",
            confirmPassword: ""
        })

        try {
            await registerUser(formData);
            console.log("Успішна реєстрація:", response.message);
        } catch (error) {
            console.error("Помилка:", error);
        }
    };

    return (
        <div className={regStyles.registerPageContainer}>
            <div className={regStyles.registerFormContainerMain}>
                <div className={regStyles.registerFormContainer}>
                    <div className={regStyles.registerLogo}>
                        {t("register_page.title")}
                    </div>
                    <div className={regStyles.registerFormContainerMainBlock}>
                        <div className={regStyles.registerVariantsBar}>
                            <div className={regStyles.regVariantsBarText}>
                                <Image className={regStyles.regVariantsBarTextImg}
                                       src={registerWith}
                                       width={100}
                                       alt="register with"
                                />
                            </div>
                            <div className={regStyles.regVariantsBarIcons}>
                                <Image src={googleIcon} className={regStyles.regVariantsBarContentIcon} alt="G-icon"/>
                                <Image src={appleIcon} className={regStyles.regVariantsBarContentIcon} alt="A-icon"/>
                                <Image src={instIcon} className={regStyles.regVariantsBarContentIcon} alt="I-icon"/>
                                <Image src={fbIcon} className={regStyles.regVariantsBarContentIcon} alt="F-icon"/>
                                <Image src={xIcon} className={regStyles.regVariantsBarContentIcon} alt="X-icon"/>
                            </div>
                        </div>
                        <div className={regStyles.registerForm}>
                            <div className={regStyles.registerFormBody}>
                                <label className={regStyles.registerFormBodyLabel}>
                                    <span className={regStyles.registerFormBodyLabelName}>
                                        {t("register_page.email")}
                                    </span>
                                    <CustomInput
                                        type="email"
                                        name="email"
                                        placeholder={t("register_page.emailPlaceholder")}
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={t(errorForInput.email)}
                                    />
                                </label>
                                <label className={regStyles.registerFormBodyLabel}>
                                    <span className={regStyles.registerFormBodyLabelName}>
                                        {t("register_page.password")}
                                    </span>
                                    <CustomInput
                                        type="password"
                                        name="password"
                                        placeholder={t("register_page.passwordPlaceholder")}
                                        tooltipText={t("tooltip.passwordTooltip")}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={t(errorForInput.password)}
                                    />
                                </label>
                                <label className={regStyles.registerFormBodyLabel}>
                                    <span className={regStyles.registerFormBodyLabelName}>
                                        {t("register_page.confirmPassword")}
                                    </span>
                                    <CustomInput
                                        type="password"
                                        name="confirmPassword"
                                        placeholder={t("register_page.confirmPasswordPlaceholder")}
                                        tooltipText={t("tooltip.passwordTooltip")}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={t(errorForInput.confirmPassword)}
                                    />
                                </label>
                            </div>
                            <div className={regStyles.registerFormFooter}>
                                <div className={regStyles.registerFormFooterLinks}>
                                    <span>
                                        <Link
                                            href={`/${locale}/register`}
                                            className={regStyles.registerFormFooterLinksLink}
                                        >
                                            {t("register_page.haveAccount")}
                                        </Link>
                                    </span>
                                </div>
                                <CustomButton
                                    text={t("register_page.register")}
                                    onClick={handleSubmit}
                                    isDisabled={buttonStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default register;
