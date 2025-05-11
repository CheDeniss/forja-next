'use client';

import footerStyles from './Footer.module.css';
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import steam from '@/../public/assets/icons/svg/steam.svg';
import facebook from '@/../public/assets/icons/svg/Facebook.svg';
import epicgames from '@/../public/assets/icons/svg/EpicGames.svg';
import instagram from '@/../public/assets/icons/svg/Instagram.svg';
import twitter from '@/../public/assets/icons/svg/twiter_ico.svg';
import forjaLogo from '@/../public/assets/images/footer/Vector.png';
import smooooke from '@/../public/assets/images/footer/smoke_element.svg';

const Footer = () => {
    const { t } = useTranslation('footer');

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className={footerStyles.footer}>
            <div onClick={handleScrollToTop} className={footerStyles.topButton}>
                <span className={footerStyles.topButtonText}>{t('back_To_Top')}</span>
            </div>
            <div className={footerStyles.content}>

                <div className={footerStyles.contentLogoImg}>
                    <Image src={forjaLogo} alt="Forja Logo" className={footerStyles.contentLogoImg} />
                </div>

                <div className={footerStyles.contentMain}>
                    <nav className={footerStyles.nav}>
                        <Link href="#" className={footerStyles.navLink}>{t('links.privacy')}</Link>
                        <Link href="#" className={footerStyles.navLink}>{t('links.legal')}</Link>
                        <Link href="#" className={footerStyles.navLink}>{t('links.cookie_settings')}</Link>
                        <Link href="#" className={footerStyles.navLink}>{t('links.cookie_policy')}</Link>
                        <Link href="#" className={footerStyles.navLink}>{t('links.terms')}</Link>
                    </nav>
                    <div className={footerStyles.social}>
                        <Link href="#" className={footerStyles.socialLink}><Image src={steam} alt="Steam" /></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={facebook} alt="Facebook" /></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={epicgames} alt="Epic Games" /></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={instagram} alt="Instagram" /></Link>
                        <Link href="#" className={footerStyles.socialLink}><Image src={twitter} alt="Twitter" /></Link>
                    </div>
                    <div className={footerStyles.info}>
                        <div className={footerStyles.section}>
                            <h4 className={footerStyles.sectionTitle}>{t('roles.development')}:</h4>
                            <p className={footerStyles.sectionText}>{t('team.kirilchenko_grigory')}</p>
                            <p className={footerStyles.sectionText}>{t('team.cherneta_denys')}</p>
                        </div>
                        <div className={footerStyles.section}>
                            <h4 className={footerStyles.sectionTitle}>{t('roles.content')}:</h4>
                            <p className={footerStyles.sectionText}>{t('team.daniil_korsunsky')}</p>
                            <p className={footerStyles.sectionText}>{t('team.rudenko_artem')}</p>
                        </div>
                        <div className={footerStyles.section}>
                            <h4 className={footerStyles.sectionTitle}>{t('roles.security')}:</h4>
                            <p className={footerStyles.sectionText}>{t('team.damn_evgenia')}</p>
                        </div>
                    </div>
                </div>

                <div className={footerStyles.art}>
                    <Image src={smooooke} alt={"Smoke"} className={footerStyles.artSmoke} />
                </div>

            </div>
        </footer>
    );
};

export default Footer;
