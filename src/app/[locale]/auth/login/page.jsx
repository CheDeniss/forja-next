'use client';

import React, {useEffect, useState} from 'react';
import loginStyles from './Login.module.css';
import CustomInput from "../../../components/ui/CustomInput/CustomInput.jsx";
import CustomButtonForm from "../../../components/ui/CustomButtonForms/CustomButtonForms.jsx";
import { useAuth } from "../../../../context/AuthContext.js";
import {validateEmail, validatePassword} from "../../../../utils/validationUtils.js";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {useParams, useRouter} from "next/navigation";
import logger from "../../../../utils/logger.js";
import Loader from "../../../components/ui/Loader/Loader.jsx";

import googleIcon from "../../../../../public/assets/icons/svg/Google.svg";
import appleIcon from "../../../../../public/assets/icons/svg/Apple.svg";
import instIcon from "../../../../../public/assets/icons/svg/Instagram.svg";
import fbIcon from "../../../../../public/assets/icons/svg/Facebook.svg";
import xIcon from "../../../../../public/assets/icons/svg/twiter_ico.svg";
import loginWith from "../../../../../public/assets/images/login/Log_in_with.svg";

const Login = () => {
    const { t } = useTranslation(['auth', 'errors']);
    const { login, isAuthLoading } = useAuth();
    const { locale } = useParams();

    const router = useRouter();

    const [tryToCorrect, setTryToCorrect] = useState(false);
    const [wasIncorrectLogin, setWasIncorrectLogin] = useState(false);

    const [formData, setFormData] = useState({
        email: document.querySelector('input[name="email"]')?.value || "",
        password: document.querySelector('input[name="password"]')?.value || ""
    });

    const [errors, setErrors] = useState({
        email: "errors.emailRequired",
        password: "errors.passwordRequired"
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
                        {t("login.title")}
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
                                        {t("login.email")}
                                    </span>
                                    <CustomInput
                                        type="email"
                                        name="email"
                                        placeholder={t("login.email_Placeholder")}
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={t(errorForInput.email, { ns: 'errors' })}
                                    />
                                </label>
                                <label className={loginStyles.loginFormBodyLabel}>
                                    <span className={loginStyles.loginFormBodyLabelName}>
                                        {t("login.password")}
                                    </span>
                                    <CustomInput
                                        type="password"
                                        name="password"
                                        placeholder={t("login.password_Placeholder")}
                                        tooltipText={t("tooltip.password_Tooltip")}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={t(errorForInput.password, { ns: 'errors' })}
                                    />
                                </label>
                            </div>
                            <div className={loginStyles.loginFormFooter}>
                                <div className={loginStyles.loginFormFooterLinks}>
                                    <span>
                                        <Link
                                            href={`/${locale}/auth/forgot-password`}
                                            className={loginStyles.loginFormFooterLinksLink}
                                        >
                                            {t("login.forgot_Password")}
                                        </Link>
                                    </span>
                                    <span>
                                        <Link
                                            href={`/${locale}/auth/register`}
                                            className={loginStyles.loginFormFooterLinksLink}
                                        >
                                            {t("login.no_Account")}
                                        </Link>
                                    </span>
                                </div>
                                <CustomButtonForm
                                    text={t("login.login")}
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
