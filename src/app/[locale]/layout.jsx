import FooterWrapper from '../components/Footer/FooterWrapper.jsx';
import { AuthProvider } from '../../context/authContext.js';
import NavbarWrapper from '../components/Navigation/NavbarWrapper.jsx';
import I18nProvider from './i18n-provider.jsx';
import {ThemeProvider} from "@mui/material";
import muiTheme from '../styles/muiTheme.js';

export default async function LocaleLayout({ children, params }) {
    // const locale = await Promise.resolve(params?.locale || 'uk');
    const locale = (await params).locale || 'en';

    return (
        // <html lang={locale}>
        //     <body className="app-container">
                <ThemeProvider theme={muiTheme}>
                    <I18nProvider locale={locale}>
                        <AuthProvider>
                            <NavbarWrapper />
                                <main className="main">
                                    {children}
                                </main>
                            <FooterWrapper />
                        </AuthProvider>
                    </I18nProvider>
                </ThemeProvider>
        //     </body>
        // </html>
    );
}
