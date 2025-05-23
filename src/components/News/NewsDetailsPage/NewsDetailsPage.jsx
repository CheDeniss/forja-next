import React from 'react';
import styles from "@/components/News/NewsSection/NewsSection.module.scss";
import TrendingCard from "@/components/News/TrendingCard/TrendingCard.jsx";
import NewsItemForPage from "@/components/News/NewsItemForPage/NewsItemForPage.jsx";


const NewsDetailsPage = ({ left, right }) => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.left}>
               <NewsItemForPage article={left} />
            </div>
            <div className={styles.right}>
                <span className="sectionTitle" style={{paddingBottom: '0'}}>Trending for You</span>
                {right.map((item, index) => (
                    <TrendingCard key={index} article={item}/>
                ))}
            </div>
        </section>
    );
};

export default NewsDetailsPage;
