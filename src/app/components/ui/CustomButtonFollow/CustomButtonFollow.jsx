'use client';

import React, { useState } from "react";
import styles from "./CustomButtonFollow.module.scss";
import { startFollow, unfollow } from "../../../../api/profileService.js"; // або актуальний шлях

const CustomButtonFollow = ({ followerId, followedId, recordId, initiallyFollowing = false }) => {
    const [isFollow, setIsFollow] = useState(initiallyFollowing);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            if (isFollow) {
                await unfollow(recordId);
                setIsFollow(false);
            } else {
                await startFollow(followerId, followedId);
                setIsFollow(true);
            }
        } catch (error) {
            console.error("Follow/unfollow error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.customButtonMainContainer}>
            <div className={styles.buttonWrapper}>
                <div className={`${styles.buttonBorder} ${isFollow ? styles.buttonBorderUnfollow : ""}`}></div>
                <button
                    id="customButton"
                    className={` ${styles.customButton} ${isFollow ? styles.customButtonUnfollow : ""}`}
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? "..." : isFollow ? "Unfollow" : "Follow"}
                </button>
            </div>
        </div>
    );
};

export default CustomButtonFollow;