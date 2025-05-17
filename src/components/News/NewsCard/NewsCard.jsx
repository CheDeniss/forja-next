'use client';

import React from "react";
import styles from './NewsCard.module.scss';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import {openNewsInNewTab} from "@/utils/openNewsInNewTab.js";

export default function NewsCard({ article }) {
    console.log('article1111111', article);
  const preview = article.content.replace(/\\n|\\|[*_]/g, '').slice(0, 220)+ "...";
  const date = new Date(article.publicationDate).toLocaleDateString();

  return (
    <div className={styles.card}>
      <img src={article.imageUrl} alt={article.title} className={styles.image} />
      <div className={styles.content}>
          <span className={styles.date}>{date}</span>
          <span className={styles.title}>{article.title}</span>
          <span className={styles.preview}>{preview}</span>
          <CustomButtonOther onClick={() => openNewsInNewTab(article.id)}>Read more</CustomButtonOther>
      </div>
    </div>
  );
}