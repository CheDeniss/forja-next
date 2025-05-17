import NewsHero from "@/components/News/NewsHero/NewsHero.jsx";
import {getAllNews} from "@/api/ServerServices/serverFetchServices.js";
import styles from './NewsPage.module.scss'
import NewsSection from "@/components/News/NewsSection/NewsSection.jsx";

export default async function NewsPage({ searchParams }) {
    const page = Number((await searchParams).page || 1);
    const data = await getAllNews(page);
    const { prioritizedNewsArticles, paginatedResult } = data;

    return (
        <div className={styles.wrapper}>
            <NewsHero articles={prioritizedNewsArticles.slice(0, 2)} />
            <NewsSection left={paginatedResult.items} right={prioritizedNewsArticles.slice(2)} />
        </div>
    );
}
