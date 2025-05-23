'use client';
import React from 'react';
import styles from './TrendingCard.module.scss';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import {openNewsInNewTab} from "@/utils/openNewsInNewTab.js";

export default function TrendingCard({ article }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={article.imageUrl || '/assets/images/image-fallback.png'}
                    alt={article.title}
                    onError={(e) => { e.target.src = '/assets/images/image-fallback.png'; }}
                />
            </div>
            <div className={styles.footer}>
                <span className={styles.title}>
                    {article.title.toUpperCase()}
                </span>
                <CustomButtonOther onClick={() => openNewsInNewTab(article.id)}>Read more</CustomButtonOther>
            </div>
        </div>
    );
}
