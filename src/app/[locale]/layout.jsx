import FooterWrapper from '@/components/Footer/FooterWrapper.jsx';
import NavbarWrapper from '@/components/Navigation/NavbarWrapper.jsx';
import I18nProvider from './i18n-provider.jsx';
import {ThemeProvider} from "@mui/material";
import muiTheme from '@/styles/muiTheme.js';

export default async function LocaleLayout({ children, params }) {
    const locale = (await params).locale || 'en';

    return (
        <ThemeProvider theme={muiTheme}>
            <I18nProvider locale={locale}>
                    <div className="wrapper">
                        <NavbarWrapper />
                            <div className="main">
                                {children}
                            </div>
                        <FooterWrapper />
                    </div>
            </I18nProvider>
        </ThemeProvider>
    );
}
