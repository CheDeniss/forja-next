
'use client';

import React, { useState, useEffect } from 'react';
import stylesNav from './Navigation.module.scss';
import Header from "../Header/Header.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext.js";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useCartSummary} from "@/hooks/useCartSummary.js";
import BadgeDot from "@/components/ui/BadgeDot/BadgeDot.jsx";

const Navbar = () => {
    const { user, userRoles } = useAuth();
    // const [IsAdmin, setIsAdmin] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, i18n } = useTranslation('navmenu');
    const { locale } = useParams();
    const IsAdmin = userRoles?.includes("Administrator");
    const { cartData } = useCartSummary();

    console.log('cartData - nav:', cartData);
    console.log('isAdmin - nav:', IsAdmin);
    console.log('userRoles - nav:', userRoles);
    console.log('user - nav:', user);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setIsScrolled(scrollTop > 80);
        };

        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header isScrolled={isScrolled} />
            <nav className={`${stylesNav.navbar} ${isScrolled ? stylesNav.navbarFixed : ""}`}>
                <div className={stylesNav.navLeftMenu}>
                    <ul className={stylesNav.navLinks}>
                        <li>
                            <Link href={`/${locale}/`}>
                                {t("home")}                      {/*     Home      */}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/catalog`}>
                                {t("catalog")}                   {/*     Catalog    */}
                            </Link>
                        </li>
                        {user &&
                            <li>
                                <Link href={`/${locale}/library`}>
                                   {t("library")}                {/*     Library     */}
                                </Link>
                            </li>
                        }
                        <li>
                            <Link href={`/${locale}/news`}>
                                {t("news")}                      {/*     News      */}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/faq`}>
                                {t("faq")}                       {/*     FAQ       */}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={stylesNav.navRightMenu}>
                    <ul className={stylesNav.navLinks}>
                        {user &&
                            <li>
                                <Link href={`/${locale}/cart`}>
                                    {t("cart")}                  {/*     Cart      */}
                                </Link>
                                {cartData?.hasItems && <BadgeDot className={stylesNav.dot} />}
                            </li>}
                        <li>
                            {user ? (
                                <Link href={`/${locale}/profile`}>
                                    {t("profile")}               {/*     Profile   */}
                                </Link>
                            ) : (
                                <Link href={`/${locale}/auth/login`}>
                                    {t("login")}                 {/*     Login     */}
                                </Link>
                            )}
                        </li>
                        <li>
                            <LanguageSwitcher />
                        </li>
                        {IsAdmin && (
                            <li>
                                <Link href={`/${locale}/admin`}>      {/*     Admin     */}
                                    <AdminPanelSettingsIcon sx={{ fontSize: 35, color: '#FF6568' }} />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
