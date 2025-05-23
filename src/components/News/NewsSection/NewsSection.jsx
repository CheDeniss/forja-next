import React from 'react';
import styles from './NewsSection.module.scss';
import NewsCard from "@/components/News/NewsCard/NewsCard.jsx";
import TrendingCard from "@/components/News/TrendingCard/TrendingCard.jsx";

export default function NewsSection({ left, right }) {
    return (
        <section className={styles.wrapper}>
            <div className={styles.left}>
                {left.map((item, index) => (
                    <React.Fragment key={item.id ?? index}>
                        <div className={styles.newsCartHr} />
                        <NewsCard article={item} />
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.right}>
                <span className="sectionTitle" style={{paddingBottom: '0'}}>Trending for You</span>
                {right.map((item, index) => (
                    <TrendingCard key={index} article={item}/>
                ))}
            </div>
        </section>
    );
}
