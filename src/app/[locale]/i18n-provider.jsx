// 'use client';
//
// import { I18nextProvider } from 'react-i18next';
// import { createI18n } from '../../i18n/i18n';
// import { useMemo } from 'react';
//
// export default function I18nProvider({ children, locale }) {
//     const i18nInstance = useMemo(() => createI18n(locale), [locale]);
//     console.log('[I18nProvider] locale:', locale);
//
//     return (
//         <I18nextProvider i18n={i18nInstance}>
//             {children}
//         </I18nextProvider>
//     );
// }

'use client';
import { I18nextProvider } from 'react-i18next';
import { createI18n } from '../../i18n/i18n';
import { useEffect, useState } from 'react';

export default function I18nProvider({ children, locale }) {
    const [i18nInstance, setI18nInstance] = useState(null);

    useEffect(() => {
        const instance = createI18n(locale || 'uk');
        setI18nInstance(instance);
    }, [locale]);

    if (!i18nInstance) return null; // або спінер

    return (
        <I18nextProvider i18n={i18nInstance}>
            {children}
        </I18nextProvider>
    );
}

