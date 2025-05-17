'use client';
import React from 'react';
import styles from './NewsHero.module.scss';
import { format } from 'date-fns';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import {openNewsInNewTab} from "@/utils/openNewsInNewTab.js";

export default function NewsHero({ articles }) {

    console.log('articles', articles);
    if (!articles || articles?.length !== 2) {
        return <span className="no_Items_Found">Oh no! Something has gone wrong</span>
    }

    return (
        <div className={styles.container}>
            <span className="sectionTitle">Latest News</span>

            <section className={styles.newsHero}>
                {articles.slice(0, 2).map((article) => (
                    <div key={article.id} className={styles.newsItem}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={article.imageUrl || '/assets/images/image-fallback.png'}
                                alt={article.title}
                                onError={(e) => {
                                    e.target.src = '/assets/images/image-fallback.png';
                                }}
                            />
                        </div>
                        <div className={styles.meta}>
                        <span className={styles.date}>
                            REGULAR UPDATE {format(new Date(article.publicationDate), 'dd MMMM')}
                        </span>
                        </div>
                        <h3 className={styles.title}>{article.title}</h3>
                        <p className={styles.excerpt}>
                            {article.content.replace(/\\n|\\|[*_]/g, '').slice(0, 220)}...
                        </p>
                        <CustomButtonOther onClick={() => openNewsInNewTab(article.id)}>Read more</CustomButtonOther>
                    </div>
                ))}
            </section>
        </div>
    );
}


// import React from "react";
// import styles from './NewsHero.module.scss';
// import Link from "next/link";
//
// export default function NewsHero({ articles }) {
//     return (
//         <div className={styles.hero}>
//             {articles.map((news) => (
//                 <Link href={`/news/${news.id}`} className={styles.item} key={news.id}>
//                     <img src={news.imageUrl} alt={news.title} className={styles.image} />
//                     <div className={styles.overlay}>
//                         <h3>{news.title}</h3>
//                         <p>{new Date(news.publicationDate).toLocaleDateString()}</p>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
// }
