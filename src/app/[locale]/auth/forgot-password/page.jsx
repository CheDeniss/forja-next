'use client';

import React, { useState } from 'react';
import ForgotPassStyles from './ForgotPass.module.css';
import CustomInput from "../../../components/ui/CustomInput/CustomInput.jsx";
import CustomButtonForm from "../../../components/ui/CustomButtonForms/CustomButtonForms.jsx";
import { useAuth } from "../../../../context/authContext.js";
import { validateEmail } from "../../../../utils/validationUtils.js";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams, useRouter } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";
import Loader from "../../../components/ui/Loader/Loader.jsx";

const ForgotPassword = () => {
    const { t } = useTranslation(['auth', 'errors']);
    const { handleForgotPassword, isAuthLoading } = useAuth();
    const { locale } = useParams();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const router = useRouter();
    const [tryToCorrect, setTryToCorrect] = useState(false);
    const [wasIncorrectLogin, setWasIncorrectLogin] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
    });

    const [errors, setErrors] = useState({
        email: "errors.emailRequired",
    });

    const [errorForInput, setErrorForInput] = useState({
        email: "",
    });

    const [buttonStatus, setButtonStatus] = useState("error");

    const handleChange = (name, value) => {
        setFormData((prevState) => {
            const updatedFormData = { ...prevState, [name]: value };

            if (wasIncorrectLogin) {
                clearErrors();
                setWasIncorrectLogin(false);
            }

            if (tryToCorrect) {
                setErrorForInput((prevState) => ({
                    ...prevState,
                    email: "",
                }));
                setTryToCorrect(false);
            }

            setErrors((prevErrors) => {
                const updatedErrors = {
                    ...prevErrors,
                    email: validateEmail(updatedFormData.email),
                };

                const hasErrors = Object.values(updatedErrors).some((error) => error);
                setButtonStatus(hasErrors ? "error" : "success");

                return updatedErrors;
            });

            return updatedFormData;
        });
    };

    const clearErrors = () => {
        setErrorForInput({ email: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (buttonStatus === "error") {
            setErrorForInput({
                email: errors.email,
            });
            setTryToCorrect(true);
            return;
        }

        clearErrors();
        try {
            const dataWithLocale = { ...formData, locale };
            await handleForgotPassword(dataWithLocale);
            setOpenSnackbar(true);
            // router.push(`/${locale}/home`);
        } catch (err) {
            if (err.message === "400") {
                setErrorForInput({
                    email: t("errors.incorrectEmailPassword"),
                });
                setWasIncorrectLogin(true);
            } else {
                setErrorForInput({
                    email: t("errors.somethingWentWrong"),
                });
            }
        }
    };

    return (
        <div className={ForgotPassStyles.forgotPassPageContainer}>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Лист для скидання пароля надіслано. Перевірте свою пошту.
                </Alert>
            </Snackbar>

            <Loader isLoading={isAuthLoading} />

            <div className={ForgotPassStyles.forgotPassFormContainerMain}>
                <div className={ForgotPassStyles.forgotPassFormContainer}>
                    <div className={ForgotPassStyles.forgotPassLogo}>
                        {t("forgot_Password.title")}
                    </div>
                    <div className={ForgotPassStyles.forgotPassFormContainerMainBlock}>
                        <div className={ForgotPassStyles.forgotPassForm}>
                            <div className={ForgotPassStyles.forgotPassFormBody}>
                                <label className={ForgotPassStyles.forgotPassFormBodyLabel}>
                                    <span className={ForgotPassStyles.forgotPassFormBodyLabelName}>
                                        {t("forgot_Password.email")}
                                    </span>
                                    <CustomInput
                                        type="email"
                                        name="email"
                                        placeholder={t("forgot_Password.email_Placeholder")}
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={t(errorForInput.email, { ns: 'errors' })}
                                    />
                                </label>
                            </div>
                            <div className={ForgotPassStyles.forgotPassFormFooter}>
                                <div className={ForgotPassStyles.forgotPassFormFooterLinks}>
                                    <span>
                                        <Link
                                            href={`/${locale}/auth/login`}
                                            className={ForgotPassStyles.forgotPassFormFooterLinksLink}
                                        >
                                            {t("forgot_Password.return_Login")}
                                        </Link>
                                    </span>
                                </div>
                                <CustomButtonForm
                                    text={t("forgot_Password.send_Email")}
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

export default ForgotPassword;
