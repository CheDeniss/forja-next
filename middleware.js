import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['uk', 'en'];
const defaultLocale = 'uk';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        PUBLIC_FILE.test(pathname) ||
        pathname.startsWith('/api') ||
        pathname.includes('_next')
    ) {
        return NextResponse.next();
    }

    const pathnameLocale = pathname.split('/')[1];
    if (locales.includes(pathnameLocale)) {
        return NextResponse.next();
    }

    const cookieLang = request.cookies.get('NEXT_LOCALE')?.value;
    const acceptLang = request.headers.get('accept-language') || '';
    const browserLang = acceptLang.split(',')[0].split('-')[0];

    const matchedLocale =
        locales.includes(cookieLang) ? cookieLang :
            locales.includes(browserLang) ? browserLang :
                defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${matchedLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
};
