import {getLocaleFromCookie} from "@/utils/locale.js";

export function openNewsInNewTab(newsId) {
    const locale = getLocaleFromCookie();
    const url = `/${locale}/news/${newsId}`;
    window.open(url, '_blank');
}