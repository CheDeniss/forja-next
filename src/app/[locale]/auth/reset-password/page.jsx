'use client';

import React, { useState } from 'react';
import resetPassStyles from './ResetPass.module.css';
import CustomInput from "@/components/ui/CustomInput/CustomInput.jsx";
import CustomButtonForm from "@/components/ui/CustomButtonForms/CustomButtonForms.jsx";
import { useAuth } from "../../../../context/AuthContext.js";
import { validatePassword } from "../../../../utils/validationUtils.js";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";
import Loader from "@/components/ui/Loader/Loader.jsx";

const ResetPassword = () => {
    const { t } = useTranslation(['auth', 'errors']);
    const { handleResetPassword, isAuthLoading } = useAuth();
    const { locale } = useParams();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const router = useRouter();

    const [tryToCorrect, setTryToCorrect] = useState(false);
    const [wasIncorrectLogin, setWasIncorrectLogin] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
    });

    const [errors, setErrors] = useState({
        password: "errors.passwordRequired",
    });

    const [errorForInput, setErrorForInput] = useState({
        password: "",
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
                setErrorForInput({ password: "" });
                setTryToCorrect(false);
            }

            setErrors((prevErrors) => {
                const updatedErrors = {
                    ...prevErrors,
                    password: validatePassword(updatedFormData.password),
                };

                const hasErrors = Object.values(updatedErrors).some((error) => error);
                setButtonStatus(hasErrors ? "error" : "success");

                return updatedErrors;
            });

            return updatedFormData;
        });
    };

    const clearErrors = () => {
        setErrorForInput({ password: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (buttonStatus === "error") {
            setErrorForInput({ password: errors.password });
            setTryToCorrect(true);
            return;
        }

        clearErrors();

        try {
            const requestBody = {
                token,
                password: formData.password,
                temporary: false,
            };

            await handleResetPassword(requestBody);
            setOpenSnackbar(true);
            router.push(`/${locale}/auth/login`);
        } catch (err) {
            setErrorForInput({
                password: t("errors.somethingWentWrong"),
            });
        }
    };

    return (
        <div className={resetPassStyles.resetPassPageContainer}>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success"
                       sx={{ width: '100%' }}
                       variant="filled">
                    {t("reset_Password.success")}
                </Alert>
            </Snackbar>

            <Loader isLoading={isAuthLoading} />

            <div className={resetPassStyles.resetPassFormContainerMain}>
                <div className={resetPassStyles.resetPassFormContainer}>
                    <div className={resetPassStyles.resetPassLogo}>
                        {t("reset_Password.title")}
                    </div>
                    <div className={resetPassStyles.resetPassFormContainerMainBlock}>
                        <div className={resetPassStyles.resetPassForm}>
                            <div className={resetPassStyles.resetPassFormBody}>
                                <label className={resetPassStyles.resetPassFormBodyLabel}>
                                    <span className={resetPassStyles.resetPassFormBodyLabelName}>
                                        {t("reset_Password.password")}
                                    </span>
                                    <CustomInput
                                        type="password"
                                        name="password"
                                        placeholder={t("reset_Password.password_Placeholder")}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={t(errorForInput.password, { ns: 'errors' })}
                                    />
                                </label>
                            </div>
                            <div className={resetPassStyles.resetPassFormFooter}>
                                <div className={resetPassStyles.resetPassFormFooterLinks}>
                                    <span>
                                        <Link
                                            href={`/${locale}/auth/login`}
                                            className={resetPassStyles.resetPassFormFooterLinksLink}
                                        >
                                            {t("reset_Password.return_Login")}
                                        </Link>
                                    </span>
                                </div>
                                <CustomButtonForm
                                    text={t("reset_Password.reset_Password")}
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

export default ResetPassword;
