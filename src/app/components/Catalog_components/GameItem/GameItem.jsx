'use client';

import React from "react";
import styles from "./GameItem.module.scss";

const GameItem = ({ data }) => {
    const {
        title
        // rating ,
        // genres,
        // tags,
        // releaseDate,
        // isFree,
        // basePrice,
        // discountPercent,
        // finalPrice,
        // saleEndDate,
        // imageUrl,
    } = data;

    // {
    //     "id": "92abc22e-7f8c-4a20-b371-ec099b04d9b4",
    //     "title": "Adventure Quest",
    //     "shortDescription": "Explore the unknown!",
    //     "description": "An epic journey awaits you in Adventure Quest.",
    //     "developer": "Quest Studios",
    //     "minimalAge": "TwelvePlus",
    //     "platforms": "PC",
    //     "price": 49.99,
    //     "logoUrl": "https://example.com/adventure-quest.png",
    //     "releaseDate": "2025-04-01T12:00:00Z",
    //     "isActive": true,
    //     "interfaceLanguages": "English, Ukrainian",
    //     "audioLanguages": "English",
    //     "subtitlesLanguages": "English, Ukrainian",
    //     "systemRequirements": "OS: Windows 10, CPU: Intel i5, RAM: 8 GB, GPU: GTX 1050",
    //     "storageUrl": "https://storage.example.com/adventure-quest"
    // }

    return (
        <div className={styles.gameItem}>
            <div className={styles.leftSection}>
                {/*<img*/}
                {/*    src={imageUrl}*/}
                {/*    alt={title}*/}
                {/*    className={styles.image}*/}
                {/*/>*/}

                <div className={styles.info}>
                    <h2 className={styles.title}>{title}</h2>
                    {/*<div className={styles.rating}>Rating: {rating.label} ({rating.value})</div>*/}
                    {/*<div className={styles.genres}>Genre: {genres.join(", ")}</div>*/}
                    {/*<div className={styles.tags}>Tags: {tags.join(", ")}</div>*/}
                    {/*<div className={styles.release}>Release date: {releaseDate}</div>*/}
                </div>
            </div>

            {/*<div className={styles.rightSection}>*/}
            {/*    {isFree ? (*/}
            {/*        <button className={styles.playFree}>PLAY FOR FREE</button>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            {saleEndDate && (*/}
            {/*                <div className={styles.saleEnd}>Sale ends {new Date(saleEndDate).toLocaleString()}</div>*/}
            {/*            )}*/}
            {/*            <div className={styles.pricing}>*/}
            {/*                <span className={styles.discount}>-{discountPercent}%</span>*/}
            {/*                <span className={styles.basePrice}>{basePrice.toFixed(2)}$</span>*/}
            {/*                <span className={styles.finalPrice}>{finalPrice.toFixed(2)}$</span>*/}
            {/*            </div>*/}
            {/*            <button className={styles.playNow}>PLAY NOW</button>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default GameItem;
