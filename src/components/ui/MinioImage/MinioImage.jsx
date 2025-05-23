'use client';

import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './MinioImage.module.scss';

const MinioImage = ({
                        src,
                        alt = '',
                        width = '100%',
                        height = '100%',
                        fallbackSrc = '/assets/fallbacks/NoImage.svg',
                        className = '',
                        style = {},
                        skeleton = true,
                        onClick = undefined,
                        pointer = false,
                        onLoad = undefined
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

    const computedWidth = typeof width === 'number' ? `${width}px` : width;
    const computedHeight = typeof height === 'number' ? `${height}px` : height;

    const combinedStyle = {
        width: computedWidth,
        height: computedHeight,
        ...(pointer ? { cursor: 'pointer' } : {}),
        ...style,
    };

    if (status === 'loading' && skeleton) {
        return (
            <Skeleton
                variant="rectangular"
                width={computedWidth}
                height={computedHeight}
                className={className}
                sx={{ ...style }}
            />
        );
    }

    if (status === 'error') {
        return (
            <div
                className={`${styles.altFallback} ${className}`}
                style={combinedStyle}
                onClick={onClick}
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
            style={combinedStyle}
            onClick={onClick}
            onLoad={onLoad}
        />
    );
};

export default MinioImage;


// 'use client';
//
// import { useEffect, useState } from 'react';
// import Skeleton from '@mui/material/Skeleton';
// import styles from './MinioImage.module.scss';
//
// const MinioImage = ({
//                         src,
//                         alt = '',
//                         width = '100%',
//                         height = '100%',
//                         fallbackSrc = '/assets/fallbacks/NoImage.svg',
//                         className = '',
//                         style = {},
//                         skeleton = true,
//                         onClick = undefined,
//                         pointer = false
//                     }) => {
//     const [imgSrc, setImgSrc] = useState(src);
//     const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
//
//     useEffect(() => {
//         setStatus('loading');
//         const img = new window.Image();
//         img.src = src;
//         img.onload = () => {
//             setImgSrc(src);
//             setStatus('loaded');
//         };
//         img.onerror = () => {
//             const fallbackImg = new window.Image();
//             fallbackImg.src = fallbackSrc;
//             fallbackImg.onload = () => {
//                 setImgSrc(fallbackSrc);
//                 setStatus('loaded');
//             };
//             fallbackImg.onerror = () => {
//                 setStatus('error');
//             };
//         };
//     }, [src, fallbackSrc]);
//
//     if (status === 'loading' && skeleton) {
//         return (
//             <Skeleton
//                 variant="rectangular"
//                 width={width}
//                 height={height}
//                 className={className}
//                 sx={{ ...style }}
//             />
//         );
//     }
//
//     if (status === 'error') {
//         return (
//             <div
//                 className={`${styles.altFallback} ${className}`}
//                 style={{
//                     width: typeof width === 'number' ? `${width}px` : width,
//                     height: typeof height === 'number' ? `${height}px` : height,
//                     ...style,
//                 }}            >
//                 {alt}
//             </div>
//         );
//     }
//
//     return (
//         <img
//             src={imgSrc}
//             alt={alt}
//             className={`${styles.image} ${className}`}
//             style={{
//                 width: typeof width === 'number' ? `${width}px` : width,
//                 height: typeof height === 'number' ? `${height}px` : height,
//                 ...style,
//             }}
//             onClick={onClick}
//         />
//     );
// };
//
// export default MinioImage;
//
