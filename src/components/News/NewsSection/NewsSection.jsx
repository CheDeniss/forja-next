import React from 'react';
import styles from './NewsSection.module.scss';
import NewsCard from "@/components/News/NewsCard/NewsCard.jsx";
import TrendingCard from "@/components/News/TrendingCard/TrendingCard.jsx";

export default function NewsSection({ left, right }) {
    return (
        <section className={styles.wrapper}>
            <div className={styles.left}>
                {left.map((item, index) => (
                    <NewsCard key={index} article={item}/>
                ))}
            </div>
            <div className={styles.right}>
                {right.map((item, index) => (
                    <TrendingCard key={index} article={item}/>
                ))}
            </div>
        </section>
    );
}
