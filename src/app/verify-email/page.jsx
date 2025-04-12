"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header/Header.jsx";
import { verifyEmail } from "../../api/authService";
import styles from "./VerifyEmailPage.module.scss";
import Loader from "../components/ui/Loader/Loader.jsx";
import CustomButtonOther from "../components/ui/CustomButtonOther/CustomButtonOther.jsx";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus("error");
            setMessage("Link is invalid.");
            return;
        }

        const verify = async () => {
            try {
                await verifyEmail(token);

                const channel = new BroadcastChannel("forja-email-confirmation");
                channel.postMessage("confirmed");
                channel.close();

                setStatus("success");
                setMessage("You're all set.\nThanks for confirming your email address.");
            } catch (err) {
                setStatus("error");
                setMessage("Something went wrong.\nWe couldn't verify your email address.");
            }
        };

        verify();
    }, [searchParams]);

    useEffect(() => {
        if (status === "success") {
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        window.close();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [status]);

    return (
    <div  className={styles.container}>
        <Header isScrolled={false} showIcons={false} />
            <div className={styles.wrapper}>
                {status === "pending" && (
                    <Loader/>
                )}

                {status === "success" && (
                    <>
                        <p className={styles.text}>
                            {message}
                        </p>
                        <p className={styles.info}>
                            This window will close automatically in {countdown} seconds.
                        </p>
                        <button
                            onClick={() => window.close()}
                            className={styles.button}>
                            Close now
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <p className={styles.text}>
                            {message}
                        </p>
                        <p className={styles.info}>
                            Having trouble verifying your email? Create a support ticket, and we'll help you out!                    </p>
                        <CustomButtonOther
                            onClick={() => window.open("/faq#email-confirmation", "_blank")}>
                            Open FAQ
                        </CustomButtonOther>
                    </>
                )}
            </div>
        </div>
    );
}
