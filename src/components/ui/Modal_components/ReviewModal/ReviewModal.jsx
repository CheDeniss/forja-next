'use client';

import React, { useState } from 'react';
import styles from './ReviewModal.module.scss';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import Image from "next/image";

export default function ReviewModal({ onClose, onSubmit }) {
    const [recommend, setRecommend] = useState(null); // true / false
    const [reviewText, setReviewText] = useState('');

    const handleConfirm = () => {
        console.log('handleConfirm clicked');
        if (recommend !== null && onSubmit) {
            console.log('handleConfirm sent');
            onSubmit({ recommend, reviewText });
        }
    };


    const handleRemove = () => {
        setRecommend(null);
        setReviewText('');
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <div className={styles.headerButtons}>
                        <span className={styles.question}>Would you recommend this game to other players?</span>
                        <div className={styles.buttonsRow}>
                            <button
                                className={`${styles.recommendButton} ${recommend === true ? styles.selected : ''}`}
                                onClick={() => setRecommend(true)}
                            >
                                <Image src="/assets/icons/svg/like.svg" alt="Like" width={48} height={48}/>
                            </button>
                            <button
                                className={`${styles.recommendButton} ${recommend === false ? styles.selected : ''}`}
                                onClick={() => setRecommend(false)}
                            >
                                <Image src="/assets/icons/svg/dislike.svg" alt="Dislike" width={48} height={48}/>
                            </button>
                        </div>
                    </div>
                    <span className={styles.title}>Review</span>
                </div>

                <textarea
                    className={styles.reviewInput}
                    placeholder="Write your review"
                    maxLength={1000}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
                <div className={styles.footerRow}>
                    <div className={styles.buttonsGroup}>

                        <CustomButtonOther
                            onClick={handleConfirm}
                            disabled={recommend === null}
                        >
                            CONFIRM
                        </CustomButtonOther>

                        <CustomButtonOther
                            onClick={handleRemove}
                        >
                            REMOVE
                        </CustomButtonOther>

                    </div>
                    <div className={styles.counter}>{`${reviewText.length} / 1000`}</div>
                </div>
            </div>
        </div>
    );
}
