import React from 'react';
import styles from "./Header.module.css";

const Header = ({ isScrolled }) => {
    return (
        <header className={`${styles.header} ${isScrolled ? styles.hidden : ''}`}>
            <img className={styles.headerFlame} src="/assets/images/logos/Flame.svg" alt="FLAME"/>
            <div className={styles.logoSliconsContainer}>
                <img className={styles.slIcon} src="/assets/icons/header-social-icons/fb-sl-icon.svg" alt="Facebook"/>
                <img className={styles.slIcon} src="/assets/icons/header-social-icons/inst-sl-icon.svg" alt="Instagram"/>
                <img className={styles.slIcon} src="/assets/icons/header-social-icons/x-sl-icon.svg" alt="X (Twitter)"/>
                <img className={styles.slIcon} src="/assets/icons/header-social-icons/eg-sl-icon.svg" alt="EG"/>

                <img className={styles.headerLogo} src="/assets/images/logos/Forja.png" alt="FORJA"/>
            </div>
        </header>
    );
};

export default Header;
