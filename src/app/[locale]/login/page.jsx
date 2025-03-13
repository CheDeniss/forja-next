'use client';

import React, { useState } from 'react';
import loginStyles from './Login.module.css';
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import { useAuth } from "../../../context/authContext";
import {validateEmail, validatePassword} from "../../../../src/utils/validationUtils";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {useParams, useRouter} from "next/navigation";
import logger from "../../../utils/logger";
import Loader from "../../../app/components/ui/Loader.jsx";

import googleIcon from "../../../../public/assets/icons/svg/Google.svg";
import appleIcon from "../../../../public/assets/icons/svg/Apple.svg";
import instIcon from "../../../../public/assets/icons/svg/Instagram.svg";
import fbIcon from "../../../../public/assets/icons/svg/Facebook.svg";
import xIcon from "../../../../public/assets/icons/svg/twiter_ico.svg";
import loginWith from "../../../../public/assets/images/login/Log_in_with.svg";

const Login = () => {
    const { t } = useTranslation();
    const { login, isAuthLoading } = useAuth();
    const { locale } = useParams();

    const router = useRouter();

    const [tryToCorrect, setTryToCorrect] = useState(false);
    const [wasIncorrectLogin, setWasIncorrectLogin] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: t("errors.emailRequired"),
        password: t("errors.passwordRequired"),
    });

    const [errorForInput, setErrorForInput] = useState({
        email: "",
        password: "",
    });

    const [buttonStatus, setButtonStatus] = useState("error"); // Для CustomButton


    const handleChange = (name, value) => {
        setFormData((prevState) => {
            const updatedFormData = { ...prevState, [name]: value };

            if(wasIncorrectLogin){
                clearErrors();
                setWasIncorrectLogin(false);
            }

            if (tryToCorrect) {
                setErrorForInput((prevState) => ({
                    ...prevState,
                    email: "",
                    password: "",
                }));
                setTryToCorrect(false);
            }

            setErrors((prevErrors) => {
                const updatedErrors = {
                    ...prevErrors,
                    email: validateEmail(updatedFormData.email),
                    password: validatePassword(updatedFormData.password),
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


    const clearErrors = () => {
        setErrorForInput({
            email: "",
            password: "",
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (buttonStatus === "error") {
            setErrorForInput({
                email: errors.email,
                password: errors.password,
            });
            setTryToCorrect(true); // Встановлюємо спробу виправлення помилок і по ній погасимо помилки в handleChange

            return;
        }
        clearErrors();
        try {
            await login(formData); // Викликаємо функцію login з контексту
            router.push(`/${locale}/profile`);
        } catch (err) {
            if(err.message === "400")
            {
                setErrorForInput({
                    email: t("errors.incorrectEmailPassword"),
                    password: t("errors.incorrectEmailPassword"),
                });
                setWasIncorrectLogin(true);
            }
            else {
                setErrorForInput({
                    email: t("errors.somethingWentWrong"),
                    password: t("errors.somethingWentWrong"),
                })
            }
        }
    };

    return (
            <div className={loginStyles.loginPageContainer}>
                <Loader isLoading={isAuthLoading} />
            <div className={loginStyles.loginFormContainerMain}>
                <div className={loginStyles.loginFormContainer}>
                    <div className={loginStyles.loginLogo}>
                        {t("login_page.title")}
                    </div>
                    <div className={loginStyles.loginFormContainerMainBlock}>
                        <div className={loginStyles.logVariantsBar}>
                            <div className={loginStyles.logVariantsBarText}>
                                <Image className={loginStyles.logVariantsBarTextImg}
                                       src={loginWith}
                                       width={100}
                                       alt="login with"
                                />
                            </div>
                            <div className={loginStyles.logVariantsBarIcons}>
                                <Image src={googleIcon} className={loginStyles.logVariantsBarContentIcon} alt="G-icon" />
                                <Image src={appleIcon} className={loginStyles.logVariantsBarContentIcon} alt="A-icon" />
                                <Image src={instIcon} className={loginStyles.logVariantsBarContentIcon} alt="I-icon" />
                                <Image src={fbIcon} className={loginStyles.logVariantsBarContentIcon} alt="F-icon" />
                                <Image src={xIcon} className={loginStyles.logVariantsBarContentIcon} alt="X-icon" />
                            </div>
                        </div>
                        <div className={loginStyles.loginForm}>
                            <div className={loginStyles.loginFormBody}>
                                <label className={loginStyles.loginFormBodyLabel}>
                                    <span className={loginStyles.loginFormBodyLabelName}>
                                        {t("login_page.email")}
                                    </span>
                                    <CustomInput
                                        type="email"
                                        name="email"
                                        placeholder={t("login_page.emailPlaceholder")}
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={t(errorForInput.email)}
                                    />
                                </label>
                                <label className={loginStyles.loginFormBodyLabel}>
                                    <span className={loginStyles.loginFormBodyLabelName}>
                                        {t("login_page.password")}
                                    </span>
                                    <CustomInput
                                        type="password"
                                        name="password"
                                        placeholder={t("login_page.passwordPlaceholder")}
                                        tooltipText={t("tooltip.passwordTooltip")}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={t(errorForInput.password)}
                                    />
                                </label>
                            </div>
                            <div className={loginStyles.loginFormFooter}>
                                <div className={loginStyles.loginFormFooterLinks}>
                                    <span>
                                        <Link
                                            href={`/${locale}/forgot`}
                                            className={loginStyles.loginFormFooterLinksLink}
                                        >
                                            {t("login_page.forgotPassword")}
                                        </Link>
                                    </span>
                                    <span>
                                        <Link
                                            href={`/${locale}/register`}
                                            className={loginStyles.loginFormFooterLinksLink}
                                        >
                                            {t("login_page.noAccount")}
                                        </Link>
                                    </span>
                                </div>
                                <CustomButton
                                    text={t("login_page.login")}
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

export default Login;
