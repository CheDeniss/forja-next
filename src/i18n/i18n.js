import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

import common_en from "../i18n/translations/en/common.json";
import navmenu_en from "../i18n/translations/en/navmenu.json";
import errors_en from "../i18n/translations/en/errors.json";
import auth_en from "../i18n/translations/en/auth.json";

import common_uk from "../i18n/translations/uk/common.json";
import navmenu_uk from "../i18n/translations/uk/navmenu.json";
import errors_uk from "../i18n/translations/uk/errors.json";
import auth_uk from "../i18n/translations/uk/auth.json";

import footer_en from '../i18n/translations/en/footer.json';
import footer_uk from '../i18n/translations/uk/footer.json';

import profile_en from '../i18n/translations/en/profile.json';
import profile_uk from '../i18n/translations/uk/profile.json';


const resources = {
    en: {
        common: common_en,
        navmenu: navmenu_en,
        errors: errors_en,
        auth: auth_en,
        footer: footer_en,
        profile: profile_en,
    },
    uk: {
        common: common_uk,
        navmenu: navmenu_uk,
        errors: errors_uk,
        auth: auth_uk,
        footer: footer_uk,
        profile: profile_uk,
    },
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        defaultNS: 'common', // common буде за замовчуванням
        ns: ['common', 'navmenu', 'errors', 'auth', 'footer', 'profile'],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
