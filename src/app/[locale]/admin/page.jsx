'use client';
import React from 'react';
import { Typography, Box, Grid, Paper, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import mainStyles from './mainAdminStyles.module.scss';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";

export default function AdminHomePage() {
    const { i18n } = useTranslation();
    const locale = i18n.language;

    const links = [
        { title: 'Користувачі', href: `/${locale}/admin/users` },
        { title: 'Ігри та контент', href: `/${locale}/admin/games` },
        { title: 'Новини', href: `/${locale}/admin/news` },
        { title: 'Магазин', href: `/${locale}/admin/store` },
        { title: 'Техпідтримка', href: `/${locale}/admin/support` },
        { title: 'Аналітика', href: `/${locale}/admin/analytics` },
    ];

    return (
        <Box className={mainStyles.container}>
            <h1 className={mainStyles.title}>
                Панель адміністратора
            </h1>
            <h2>
                Ласкаво просимо до адмінки. Виберіть розділ для управління платформою.
            </h2>

            <div className={mainStyles.buttonContainer}>
                {links.map((item, index) => (
                    <CustomButtonOther width="175px" height="50px" link={item.href} key={index}>{item.title}</CustomButtonOther>
                ))}
            </div>
        </Box>
    );
}
