'use client';

import React, { useState, useEffect } from 'react';
import stylesNav from './Navigation.module.css';
import Header from "../Header/Header.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useAuth} from "../../../context/authContext";

const Navbar = ({ onTestClick }) => {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();
    const { locale } = useParams();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <Header isScrolled={isScrolled}/>
            {/* Навігаційна панель */}
            <nav className={`${stylesNav.navbar} ${isScrolled ? stylesNav.navbarFixed : ""}`}>
                <div className={stylesNav.navLeftMenu}>
                    <ul className={stylesNav.navLinks}>
                        <li><Link href={`/${locale}/`}>{t("navmenu.home")}</Link></li>
                        <li><Link href={`/${locale}/login`}>{t("navmenu.news")}</Link></li>
                        <li><Link href={`/${locale}/login`}>{t("navmenu.catalog")}</Link></li>
                        <li><Link href={`/${locale}/login`}>{t("navmenu.library")}</Link></li>
                        <li><Link href={`/${locale}/login`}>{t("navmenu.faq")}</Link></li>
                        {/*<button onClick={onTestClick}>Test</button>*/}
                        {/*<a href="forja-game://">🎮 Запустити гру</a>*/}
                    </ul>
                </div>
                <div className={stylesNav.navSearchBar}>
                    <input type="text" placeholder={t("search.placeholder")}/>
                </div>
                <div className={stylesNav.navRightMenu}>
                    <ul className={stylesNav.navLinks}>
                        <li><LanguageSwitcher/></li>
                        <li><Link href={`/${locale}/login`}>{t("navmenu.cart")}</Link ></li>
                        <li>
                            {user ? (
                                <Link href={`/${locale}/profile`}>{t("navmenu.profile")}</Link> // Якщо є user → Профіль
                            ) : (
                                <Link href={`/${locale}/login`}>{t("navmenu.login")}</Link> // Якщо user немає → Логін
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
