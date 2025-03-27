'use client';

import React, {useState} from 'react';
import regStyles from './Register.module.scss';
import CustomInput from "../../components/ui/CustomInput/CustomInput.jsx";
import CustomButtonForm from "../../components/ui/CustomButtonForms/CustomButtonForms.jsx";
import {validateConfirmPassword, validateEmail, validatePassword} from "../../../../src/utils/validationUtils";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {useParams} from "next/navigation";
import { useAuth } from "../../../context/authContext";
import Link from "next/link";
import Loader from "../../components/ui/Loader/Loader.jsx";

import googleIcon from "../../../../public/assets/icons/svg/Google.svg";
import appleIcon from "../../../../public/assets/icons/svg/Apple.svg";
import instIcon from "../../../../public/assets/icons/svg/Instagram.svg";
import fbIcon from "../../../../public/assets/icons/svg/Facebook.svg";
import xIcon from "../../../../public/assets/icons/svg/twiter_ico.svg";
import registerWith from "../../../../public/assets/images/register/Register_with.svg";


const register = () => {
    const { t } = useTranslation('auth');
    const { register, isAuthLoading } = useAuth();
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
                clearErrors();
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

    const clearErrors = () => {
        setErrorForInput({
            email: "",
            password: "",
            confirmPassword: ""
        });
    }

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
        clearErrors();
        try {
            await register(formData);
            console.log("Успішна реєстрація:", response.message);
        } catch (err) {
            setErrorForInput({
                email: t("errors.somethingWentWrong"),
                password: t("errors.somethingWentWrong"),
                confirmPassword: t("errors.somethingWentWrong")
            })

        }
    };

    return (
        <div className={regStyles.registerPageContainer}>
            <Loader isLoading={isAuthLoading} />
            <div className={regStyles.registerFormContainerMain}>
                <div className={regStyles.registerFormContainer}>
                    <div className={regStyles.registerLogo}>
                        {t("register.title")}
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
                                        {t("register.email")}
                                    </span>
                                    <CustomInput
                                        type="email"
                                        name="email"
                                        placeholder={t("register.email_Placeholder")}
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={t(errorForInput.email, { ns: 'errors' })}
                                    />
                                </label>
                                <label className={regStyles.registerFormBodyLabel}>
                                    <span className={regStyles.registerFormBodyLabelName}>
                                        {t("register.password")}
                                    </span>
                                    <CustomInput
                                        type="password"
                                        name="password"
                                        placeholder={t("register.password_Placeholder")}
                                        tooltipText={t("tooltip.password_Tooltip")}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={t(errorForInput.password, { ns: 'errors' })}
                                    />
                                </label>
                                <label className={regStyles.registerFormBodyLabel}>
                                    <span className={regStyles.registerFormBodyLabelName}>
                                        {t("register.confirm_Password")}
                                    </span>
                                    <CustomInput
                                        type="password"
                                        name="confirmPassword"
                                        placeholder={t("register.confirm_Password_Placeholder")}
                                        tooltipText={t("tooltip.password_Tooltip")}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={t(errorForInput.confirmPassword, { ns: 'errors' })}
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
                                            {t("register.have_Account")}
                                        </Link>
                                    </span>
                                </div>
                                <CustomButtonForm
                                    text={t("register.register")}
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
