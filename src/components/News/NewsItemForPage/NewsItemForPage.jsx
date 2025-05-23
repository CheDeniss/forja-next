'use client';

import React from 'react';
import styles from './NewsItemForPage.module.scss';
import ReactMarkdown from 'react-markdown';

export default function NewsItemForPage({ article }) {
    const { title, publicationDate, imageUrl, content } = article;

    return (
        <div className={styles.newsItem}>
            <span className="sectionTitle">{title}</span>
            <img src={imageUrl} alt={title} className={styles.image} />
            <span className={styles.date}>
                {new Date(publicationDate).toLocaleDateString()}
            </span>
            <div className={styles.description}>
                <ReactMarkdown>
                    {content.replaceAll('\\\\n', '\n')}
                </ReactMarkdown>
            </div>
        </div>
    );
}
