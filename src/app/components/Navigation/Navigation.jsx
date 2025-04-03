// 'use client';
//
// import React, { useState, useEffect } from 'react';
// import stylesNav from './Navigation.module.css';
// import Header from "../Header/Header.jsx";
// import LanguageSwitcher from "./LanguageSwitcher.jsx";
// import { useTranslation } from "react-i18next";
// import Link from "next/link";
// import {useParams} from "next/navigation";
// import {useAuth} from "../../../context/authContext";
//
// const Navbar = ({ onTestClick }) => {
//     const { user } = useAuth();
//     const [isScrolled, setIsScrolled] = useState(false);
//     const { t } = useTranslation();
//     const { locale } = useParams();
//
//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//             if (scrollTop > 80) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };
//
//         document.body.addEventListener('scroll', handleScroll);
//         return () => document.body.removeEventListener('scroll', handleScroll);
//     }, []);
//
//
//     return (
//         <>
//             <Header isScrolled={isScrolled}/>
//             {/* Навігаційна панель */}
//             <nav className={`${stylesNav.navbar} ${isScrolled ? stylesNav.navbarFixed : ""}`}>
//                 <div className={stylesNav.navLeftMenu}>
//                     <ul className={stylesNav.navLinks}>
//                         <li><Link href={`/${locale}/`}>{t("home", { ns: 'navmenu' })}</Link></li>
//                         <li><Link href={`/${locale}/news`}>{t("news", { ns: 'navmenu' })}</Link></li>
//                         <li><Link href={`/${locale}/catalog`}>{t("catalog", { ns: 'navmenu' })}</Link></li>
//                         <li><Link href={`/${locale}/library`}>{t("library", { ns: 'navmenu' })}</Link></li>
//                         <li><Link href={`/${locale}/faq`}>{t("faq", { ns: 'navmenu' })}</Link></li>
//                         {/*<button onClick={onTestClick}>Test</button>*/}
//                         {/*<a href="forja-game://">🎮 Запустити гру</a>*/}
//                     </ul>
//                 </div>
//                 <div className={stylesNav.navSearchBar}>
//                     <input type="text" placeholder={t("search.placeholder")} />
//                 </div>
//                 <div className={stylesNav.navRightMenu}>
//                     <ul className={stylesNav.navLinks}>
//                         <li><LanguageSwitcher/></li>
//                         <li><Link href={`/${locale}/cart`}>{t("cart", { ns: 'navmenu' })}</Link ></li>
//                         <li>
//                             {user ? (
//                                 <Link href={`/${locale}/profile`}>{t('profile', { ns: 'navmenu' })}</Link> // Якщо є user → Профіль
//                             ) : (
//                                 <Link href={`/${locale}/auth/login`}>{t("login", { ns: 'navmenu' })}</Link> // Якщо user немає → Логін
//                             )}
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </>
//     );
// };
//
// export default Navbar;
'use client';

import React, { useState, useEffect } from 'react';
import stylesNav from './Navigation.module.css';
import Header from "../Header/Header.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "../../../context/authContext";

const Navbar = ({ onTestClick }) => {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, i18n } = useTranslation('navmenu');
    const { locale } = useParams();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setIsScrolled(scrollTop > 80);
        };

        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll);
    }, []);
    console.log('[Navbar] i18n.language:', i18n.language);
    return (
        <>
            <Header isScrolled={isScrolled} />
            <nav className={`${stylesNav.navbar} ${isScrolled ? stylesNav.navbarFixed : ""}`}>
                <div className={stylesNav.navLeftMenu}>
                    <ul className={stylesNav.navLinks}>
                        <li><Link href={`/${locale}/`}>{t("home")}</Link></li>
                        <li><Link href={`/${locale}/news`}>{t("news")}</Link></li>
                        <li><Link href={`/${locale}/catalog`}>{t("catalog")}</Link></li>
                        <li><Link href={`/${locale}/library`}>{t("library")}</Link></li>
                        <li><Link href={`/${locale}/faq`}>{t("faq")}</Link></li>
                    </ul>
                </div>
                <div className={stylesNav.navSearchBar}>
                    <input type="text" placeholder={t("search.placeholder", { ns: 'common' })} />
                </div>
                <div className={stylesNav.navRightMenu}>
                    <ul className={stylesNav.navLinks}>
                        <li><LanguageSwitcher /></li>
                        <li><Link href={`/${locale}/cart`}>{t("cart")}</Link></li>
                        <li>
                            {user ? (
                                <Link href={`/${locale}/profile`}>{t("profile")}</Link>
                            ) : (
                                <Link href={`/${locale}/auth/login`}>{t("login")}</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
