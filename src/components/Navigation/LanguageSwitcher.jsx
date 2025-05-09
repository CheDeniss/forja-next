'use client';

import React, { useState, useEffect } from 'react';
import styles from './LanguageSwitcher.module.scss';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Loader from "../ui/Loader/Loader.jsx";

const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { locale } = useParams();

    const languages = [
        { code: 'en', label: 'ENGLISH' },
        { code: 'uk', label: 'UKRAINIAN' },
    ];

    const changeLanguage = (lng) => {
        if (lng === locale) return;
        setIsOpen(false);
        setLoading(true);
        Cookies.set('NEXT_LOCALE', lng, { expires: 365 });

        // змінюємо локаль у URL
        const segments = pathname.split('/');
        segments[1] = lng;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => setLoading(false), 600); // трохи затримки для UX
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    return (
        <div className={styles.languageSwitcher}>
            <button className={styles.langBtn} onClick={() => setIsOpen(!isOpen)} disabled={loading}>
                <span>{locale?.toUpperCase()}</span> ▼
            </button>

            {isOpen && (
                <ul className={styles.langDropdown}>
                    {languages.map((lang) => (
                        <li key={lang.code} onClick={() => changeLanguage(lang.code)}>
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}

            <Loader isLoading={loading}/>
        </div>
    );
};

export default LanguageSwitcher;
