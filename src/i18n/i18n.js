import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../i18n/translations/en/common.json";
import uk from "../i18n/translations/uk/common.json";

const resources = {
    en: { translation: en },
    uk: { translation: uk },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;
