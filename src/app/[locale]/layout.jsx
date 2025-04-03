import '../styles/globals.css';
import FooterWrapper from '../components/Footer/FooterWrapper.jsx';
import { AuthProvider } from '../../context/authContext.js';
import NavbarWrapper from '../components/Navigation/NavbarWrapper.jsx';
import I18nProvider from './i18n-provider.jsx';

export default function LocaleLayout({ children, params }) {
    const { locale } = params;

    return (
        <html lang={locale}>
        <body className="app-container">
        <I18nProvider locale={locale}>
            <AuthProvider>
                <NavbarWrapper />
                <main className="main">
                    {children}
                </main>
                <FooterWrapper />
            </AuthProvider>
        </I18nProvider>
        </body>
        </html>
    );
}
