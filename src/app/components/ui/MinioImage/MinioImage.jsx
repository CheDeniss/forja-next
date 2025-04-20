'use client';

import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './MinioImage.module.scss';

const MinioImage = ({
                        src,
                        alt = '',
                        width = '100%',
                        height = '100%',
                        fallbackSrc = '/assets/fallbacks/default.png',
                        className = '',
                        style = {},
                        skeleton = true,
                    }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'

    useEffect(() => {
        setStatus('loading');
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
            setStatus('loaded');
        };
        img.onerror = () => {
            const fallbackImg = new window.Image();
            fallbackImg.src = fallbackSrc;
            fallbackImg.onload = () => {
                setImgSrc(fallbackSrc);
                setStatus('loaded');
            };
            fallbackImg.onerror = () => {
                setStatus('error');
            };
        };
    }, [src, fallbackSrc]);

    if (status === 'loading' && skeleton) {
        return (
            <Skeleton
                variant="rectangular"
                width={width}
                height={height}
                className={className}
                sx={{ ...style }}
            />
        );
    }

    if (status === 'error') {
        return (
            <div
                className={`${styles.altFallback} ${className}`}
                style={{ width, height, ...style }}
            >
                {alt}
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`${styles.image} ${className}`}
            style={{ width, height, ...style }}
        />
    );
};

export default MinioImage;
