import React from 'react';
import styles from "./Header.module.css";
import EmailConfirmationNotice from "../ui/EmailConfirmationNotice/EmailConfirmationNotice.jsx";

const Header = ({ isScrolled, showIcons = true }) => {
    return (
        <header className={`${styles.header} ${isScrolled ? styles.hidden : ''}`}>
            <img className={styles.headerFlame} src="/assets/images/logos/Flame.svg" alt="FLAME" />
            {showIcons && (
                <EmailConfirmationNotice />
            )}
                <div className={styles.logoSliconsContainer}>
                    {showIcons && (
                    <>
                        <img className={styles.slIcon} src="/assets/icons/header-social-icons/fb-sl-icon.svg" alt="Facebook" />
                        <img className={styles.slIcon} src="/assets/icons/header-social-icons/inst-sl-icon.svg" alt="Instagram" />
                        <img className={styles.slIcon} src="/assets/icons/header-social-icons/x-sl-icon.svg" alt="X (Twitter)" />
                        <img className={styles.slIcon} src="/assets/icons/header-social-icons/eg-sl-icon.svg" alt="EG" />
                    </>
                    )}
                    <img className={styles.headerLogo} src="/assets/images/logos/Forja.png" alt="FORJA" />
                </div>

        </header>
    );
};

export default Header;
