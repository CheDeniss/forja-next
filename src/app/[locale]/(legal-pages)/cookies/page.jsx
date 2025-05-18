'use client'

import styles from '../LegalPages.module.scss'
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import {useModal} from "@/context/ModalContext.jsx";

export default function CookiePolicyPage() {
    const { showModal } = useModal();

    const handleAcceptAll = () => {
        showModal({ modalType: 'success', modalProps: { message: 'Accepted all cookies!' } });
    };

    const handleEssentialOnly = () => {
        showModal({ modalType: 'error', modalProps: { message: "Using essential cookies only" } });
    };

    return (
        <div className={styles.container}>
            <span>COOKIE POLICY</span>
            <p>
                Forja uses cookies to enhance user experience and analyze performance.
                Cookies are small text files stored on your device.
            </p>
            <p>We use:</p>
            <ul>
                <li>Essential cookies for site functionality.</li>
                <li>Analytics cookies to understand usage.</li>
                <li>Preference cookies to remember settings.</li>
            </ul>
            <p>
                You can change your preferences in the Cookie Settings at any time.
            </p>
            <br/> <br/> <br/>
            <hr/>
            <br/> <br/> <br/>

            <span>COOKIE SETTINGS</span>
            <p>
                You can manage your cookie preferences here. We use cookies to analyze site usage,
                enhance your experience, and provide personalized content.
            </p>
            <p>
                You can enable or disable non-essential cookies at any time.
            </p>

            <div style={{display: "flex", gap: "12px", marginTop: "20px"}}>
                <CustomButtonOther onClick={handleAcceptAll}>ACCEPT ALL COOKIES</CustomButtonOther>
                <CustomButtonOther onClick={handleEssentialOnly}>USE ESSENTIAL ONLY</CustomButtonOther>
            </div>
        </div>
    );
}
