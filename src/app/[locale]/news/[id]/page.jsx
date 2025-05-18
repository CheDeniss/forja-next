import {getAllNews, getNewsById} from "@/api/ServerServices/serverFetchServices.js";
import styles from "./NewsPage.module.scss";
import React from "react";
import NewsDetailsPage from "@/components/News/NewsDetailsPage/NewsDetailsPage.jsx";

export default async function NewsPage({ params }) {
    const { id } = await params;
    const allData = await getAllNews(1);
    const pageData = await getNewsById(id);

    const { prioritizedNewsArticles, paginatedResult } = allData;

    return (
        <div className={styles.wrapper}>
            <NewsDetailsPage left={pageData} right={prioritizedNewsArticles} />
        </div>
    );
}