'use client';

import "../../../i18n/i18n";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";
import {usePathname, useRouter} from "next/navigation";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // Отримуємо поточний шлях

    const languages = [
        { code: "en", label: "ENGLISH" },
        { code: "uk", label: "UKRAINIAN" },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false); // Закриваємо випадаюче меню після вибору
        // 2. Формуємо новий URL із вибраною мовою
        const newPath = `/${lng}${pathname.substring(3)}`;

        // 3. Оновлюємо URL через Next.js роутер
        router.push(newPath);
    };

    return (
        <div className={styles.languageSwitcher}>
            <button className={styles.langBtn} onClick={() => setIsOpen(!isOpen)}>
                <span>{i18n.language.toUpperCase()}</span> ▼
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
        </div>
    );
};

export default LanguageSwitcher;
