import React, { useEffect, useState } from 'react';

import stylesNotice from './EmailConfirmationNotice.module.scss';
import { useAuth } from "../../../../context/authContext";
import { resendEmailConfirmation } from "../../../../api/authService.js";
import { Skeleton } from "@mui/material";
import logger from "../../../../utils/logger.js";
import CustomButtonOther from "../../../components/ui/CustomButtonOther/CustomButtonOther.jsx";

const EMAIL_RESEND_TIMEOUT = 5 * 60 * 1000;

const getLastEmailResend = () => {
    const ts = localStorage.getItem("lastEmailResend");
    return ts ? parseInt(ts) : null;
};

const setLastEmailResend = () => {
    localStorage.setItem("lastEmailResend", Date.now().toString());
};

const EmailConfirmationNotice = () => {
    const { user, fetchUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState('');

    useEffect(() => {
        const channel = new BroadcastChannel("forja-email-confirmation");

        channel.onmessage = (event) => {
            if (event.data === "confirmed") {
                fetchUser();
            }
        };

        return () => channel.close();
    }, [fetchUser]);

    useEffect(() => {
        if (resendMessage) {
            const timeout = setTimeout(() => setResendMessage(''), 5000);
            return () => clearTimeout(timeout);
        }
    }, [resendMessage]);

    if (!user || user.isEmailConfirmed || !user.isEmailSent) return null;

    const handleResend = async () => {
        const lastSent = getLastEmailResend();
        const now = Date.now();

        if (lastSent && now - lastSent < EMAIL_RESEND_TIMEOUT) {
            const minutesLeft = Math.ceil((EMAIL_RESEND_TIMEOUT - (now - lastSent)) / 60000);
            setResendMessage(`Повторне надсилання буде доступне через ${minutesLeft} хв.`);
            return;
        }

        try {
            setIsLoading(true);
            await resendEmailConfirmation();
            setLastEmailResend();
            await fetchUser();
        } catch (err) {
            logger.error("Не вдалося повторно надіслати лист.");
            setResendMessage("Виникла помилка. Спробуйте пізніше.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${stylesNotice.container} ${!user.isEmailSent ? stylesNotice.notSent : stylesNotice.sent}`}>
            {resendMessage && (
                <p className={stylesNotice.message}>
                    {resendMessage}
                </p>
            )}

            {!resendMessage && (
                <>
                    {isLoading ? (
                        <div className={stylesNotice.textSceleton}>
                            <Skeleton sx={{ bgcolor: 'grey.600' }} variant="text" width="90%" height={24} />
                            <Skeleton sx={{ bgcolor: 'grey.600' }} variant="text" width="60%" height={24} />
                        </div>
                    ) : (
                        <>
                            {!user.isEmailSent && (
                                <p className={stylesNotice.text}>
                                    Ми не змогли надіслати листа з підтвердженням. Натисніть кнопку, щоб спробувати повторити відправлення.
                                </p>
                            )}
                            {user.isEmailSent && (
                                <p className={stylesNotice.text}>
                                    Ми надіслали листа з підтвердженням на вашу електронну пошту. Перевірте пошту (та папку "Спам"). Якщо ви не отримали лист або термін дії минув — повторіть відправлення.
                                </p>
                            )}
                        </>
                    )}
                </>
            )}

            {isLoading ? (
                <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rounded" width={140} height={36} />
            ) : (
                <CustomButtonOther onClick={handleResend}>
                    Надіслати лист
                </CustomButtonOther>
            )}
        </div>
    );
}

export default EmailConfirmationNotice;
