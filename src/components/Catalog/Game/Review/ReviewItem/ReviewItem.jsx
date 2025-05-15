'use client';

import styles from './ReviewItem.module.scss';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import React from "react";

export default function ReviewItem({ review }) {
    const { user, positiveRating, comment } = review;
    const avatarUrl = user.avatarUrl;
    const username = user.username || 'Unknown';
    const userTag = user.userTag || 'Unknown';
    const achievements = user.achievements || [];
    const hatUrl = user.profileHatVariant ? user.profileHatVariant : 'null';

    return (
        <div className={styles.reviewItem}>

            <div className={styles.leftSide}>
                <div className={styles.avatar}>
                    <MinioImage
                    src={avatarUrl}
                    alt="Avatar"
                    />
                </div>
                <div className={styles.profileHero}>
                    <div className={styles.userDetails}>
                        <div className={styles.textData}>
                            <span className={styles.userDetailsUsername}>
                                {username}
                            </span>
                                <span className={styles.userDetailsOtherData}>
                                {userTag}
                            </span>
                        </div>
                        <div className={styles.ratingIcon}>
                            {positiveRating ? (
                                <Image src="/assets/icons/svg/like.svg" alt="Like" width={'100%'} height={'100%'}/>
                            ) : (
                                <Image src='/assets/icons/svg/dislike.svg' alt="Dislike" width={'100%'} height={'100%'}/>
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
                    {comment || (
                        <>
                            Lorem ipsum dolor sit amet consectetur. Enim leo lectus urna tristique aenean morbi in
                            in fames.
                            A blandit sit aenean faucibus rhoncus vel arcu egestas. Adipiscing sodales purus pretium
                            massa etiam ullamcorper. Dui netus sed pellentesque enim nunc curabitur semper
                            pellentesque
                            nunc. Vel nibh amet condimentum netus faucibus velit nunc nec.
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
