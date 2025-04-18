'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import { getPresignedImageUrl } from '@/api/fileService';

const urlCache = new Map();

const MinioImage = ({
                        objectPath,
                        alt = '',
                        width,
                        height,
                        fill = false,
                        fallbackSrc = '/assets/fallbacks/default.png',
                        className = '',
                        style = {},
                        skeleton = true
                    }) => {
    const [url, setUrl] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!objectPath) return;

        let isMounted = true;

        if (urlCache.has(objectPath)) {
            setUrl(urlCache.get(objectPath));
            setLoading(false);
        } else {
            getPresignedImageUrl(objectPath)
                .then(res => {
                    if (isMounted) {
                        urlCache.set(objectPath, res);
                        setUrl(res);
                        setLoading(false);
                    }
                })
                .catch(() => {
                    if (isMounted) {
                        setError(true);
                        setLoading(false);
                    }
                });
        }

        return () => {
            isMounted = false;
        };
    }, [objectPath]);

    const imageSrc = error || !url ? fallbackSrc : url;

    if (loading && skeleton) {
        return fill ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    className={className}
                    sx={{ ...style, width: '100%', height: '100%', borderRadius: '8px' }}
                />
            </div>
        ) : (
            <Skeleton
                variant="rectangular"
                animation="wave"
                className={className}
                width={width}
                height={height}
                sx={{ ...style, borderRadius: '8px' }}
            />
        );
    }

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            fill={fill}
            className={className}
            style={style}
            onError={() => setError(true)}
        />
    );
};

export default MinioImage;
