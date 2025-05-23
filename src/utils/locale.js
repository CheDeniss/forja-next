export const getLocaleFromCookie = () => {
    if (typeof document === 'undefined') return 'en';
    const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
    return match ? match[1] : 'en';
};
