'use client';

import styles from './ReviewItem.module.scss';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import React from "react";
import Image from "next/image";
import {getLocaleFromCookie} from "@/utils/locale.js";
import {useModal} from "@/context/ModalContext.jsx";

export default function ReviewItem({ review }) {
    const { user, positiveRating, comment } = review;
    const avatarUrl = user.avatarUrl;
    const username = user.username || 'Unknown';
    const userTag = user.userTag || 'Unknown';
    const hatUrl = user.hatVariantUrl || 'null';
    const { showModal } = useModal();

    const handleClick = () => {
        if (!userTag) {
            showModal({
                modalType: 'error',
                modalProps: { message: 'This user has not set a tag yet.' }
            });
            return;
        }
        const locale = getLocaleFromCookie();
        const identifier = userTag || username;
        const url = `/${locale}/profile/${identifier}`;
        window.open(url, '_blank');
    };

    return (
        <div className={styles.reviewItem}>

            <div className={styles.leftSide}>
                <div className={styles.avatar}>
                    <MinioImage
                        src={avatarUrl}
                        alt="Avatar"
                        onClick={handleClick}
                        pointer={true}
                    />
                </div>
                <div className={styles.profileHero}>
                    <div className={styles.userDetails}>
                        <div className={styles.textData}>
                           <span onClick={handleClick}
                                 className={styles.userDetailsUsername}>
                                 {username}
                            </span>
                            { userTag &&
                                <span onClick={handleClick}
                                      className={styles.userDetailsOtherData}>
                                {userTag}
                            </span>}
                        </div>
                        <div className={`${styles.ratingIcon} ${positiveRating ? styles.like : styles.dislike}`}>
                            {positiveRating ? (
                                <Image src="/assets/icons/svg/like.svg" alt="Like" width={48} height={48}/>
                            ) : (
                                <Image src="/assets/icons/svg/dislike.svg" alt="Dislike" width={48} height={48}/>
                            )}
                        </div>

                    </div>
                    <div className={styles.backgroundImage}>
                        <MinioImage
                            src={hatUrl || 'public/assets/fallbacks/NoImage.svg'}
                            alt="Profile Background"/>
                    </div>
                </div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.comment}>
                    <div className={styles.commentInner}>
                        {comment || (
                            <>
                                No review text provided.
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
