import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';

const ImageGallery = ({ images = [], fallback }) => {
    const validImages = images.length > 0 ? images : [fallback];
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={styles.galleryWrapper}>
            <div className={styles.mainImage}>
                <img src={validImages[activeIndex]} alt={`Preview ${activeIndex}`}/>
            </div>
            <div className={styles.thumbnails}>
                {validImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`${styles.thumbnail} ${idx === activeIndex ? styles.active : ''}`}
                        onClick={() => handleClick(idx)}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;