import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";

const ImageGallery = ({ images = [], fallback }) => {
    const validImages = images.length > 0 ? images : [fallback];
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={styles.galleryWrapper}>
            <div className={styles.mainImage}>
                <MinioImage src={validImages[activeIndex]} alt={`Preview ${activeIndex}`}/>
            </div>
            <div className={styles.thumbnails}>
                {validImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`${styles.thumbnail} ${idx === activeIndex ? styles.active : ''}`}
                        onClick={() => handleClick(idx)}
                    >
                        <MinioImage src={img} alt={`Thumbnail ${idx}`}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;