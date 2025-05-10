
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
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
    const { user, userRoles } = useAuth();
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
                        {user && (
                            <li>
                                {cartData?.hasItems === true ? (
                                    <Tooltip
                                        title={
                                            <div>
                                                <div style={{
                                                    fontWeight: 500,
                                                    fontFamily: "Fixel Display",
                                                    fontSize: '20px',
                                                    marginBottom: '4px'
                                                }}>
                                                    {t("items")}:
                                                    <strong>
                                                        {cartData.totalItems}
                                                    </strong>
                                                </div>
                                                <hr style={{borderColor: '#555'}}/>
                                                <div style={{
                                                    fontWeight: 500,
                                                    fontFamily: "Fixel Display",
                                                    fontSize: '20px'
                                                }}>
                                                    {t("total")}:
                                                    <strong>
                                                        {cartData.totalPrice.toFixed(2)} ₴
                                                    </strong>
                                                </div>
                                            </div>
                                        }
                                        placement="bottom"
                                        componentsProps={{
                                            popper: {
                                                sx: {
                                                    '& .MuiTooltip-tooltip': {
                                                        fontFamily: 'Fixel Display',
                                                        fontSize: '16px',
                                                        border: '3px solid #E2E2E2',
                                                        borderRadius: '2px',
                                                        backgroundColor: '#363636',
                                                        padding: '10px 12px',
                                                        maxWidth: 220,
                                                        color: '#E2E2E2',
                                                        lineHeight: 1.4,
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <Link href={`/${locale}/cart`}>
                                                {t("cart")}
                                            </Link>
                                            <BadgeDot className={stylesNav.dot} />
                                        </div>
                                    </Tooltip>
                                ) : (
                                    <Link href={`/${locale}/cart`}>
                                        {t("cart")}
                                    </Link>
                                )}
                            </li>
                        )}

                        <li>
                            {user ? (
                                <Link href={`/${locale}/profile`}>
                                    {t("profile")}
                                </Link>
                            ) : (
                                <Link href={`/${locale}/auth/login`}>
                                    {t("login")}
                                </Link>
                            )}
                        </li>

                        <li>
                            <LanguageSwitcher />
                        </li>

                        {IsAdmin && (
                            <li>
                                <Link href={`/${locale}/admin`}>
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
