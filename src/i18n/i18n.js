import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common_en from './translations/en/common.json';
import navmenu_en from './translations/en/navmenu.json';
import errors_en from './translations/en/errors.json';
import auth_en from './translations/en/auth.json';
import footer_en from './translations/en/footer.json';
import profile_en from './translations/en/profile.json';

import common_uk from './translations/uk/common.json';
import navmenu_uk from './translations/uk/navmenu.json';
import errors_uk from './translations/uk/errors.json';
import auth_uk from './translations/uk/auth.json';
import footer_uk from './translations/uk/footer.json';
import profile_uk from './translations/uk/profile.json';

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

export const createI18n = (lng = 'en') => {
    const instance = i18n.createInstance();
    console.log('[createI18n] init with:', lng);

    instance
        .use(initReactI18next)
        .init({
            resources,
            lng,
            fallbackLng: 'en',
            supportedLngs: ['uk', 'en'],
            defaultNS: 'common',
            ns: ['common', 'navmenu', 'errors', 'auth', 'footer', 'profile'],
            interpolation: {
                escapeValue: false,
            },
            react: {
                useSuspense: false,
            },
        });

    return instance;
};
