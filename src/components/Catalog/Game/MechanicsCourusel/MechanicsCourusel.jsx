'use client'

import useEmblaCarousel from 'embla-carousel-react'
import {useEffect, useCallback, useState} from 'react'
import styles from './MechanicsCourusel.module.scss'
import {NextButton, PrevButton} from "@/components/Home/GenreCarousel/EmblaCarouselArrowButtons.jsx";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import {getLocaleFromCookie} from "@/utils/locale.js";
import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent.jsx";

const CORNER_W = '35px';
const CORNER_H = '35px';

//TODO ховер на рамку, з'їзжає слайд далі ніж бачить...

const MechanicsCarousel = ({ mechanics = [], options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    const handleClick = (mechanic) => {
        const locale = getLocaleFromCookie();
        const url = `/${locale}/catalog/${mechanic.id}`;
        window.open(url, '_blank');
    };

    if (!mechanics.length) {
        return <div className="no_Items_Found">No mechanics available</div>;
    }

    return (
        <div className={styles.carousel}>
            <PrevButton onClick={scrollPrev} disabled={!canScrollPrev} />

            <div className={styles.viewport} ref={emblaRef}>
                <div className={styles.container}>
                    {mechanics.map((mechanic, index) => (

                            <div className={styles.slide}
                                 key={mechanic.id}
                                 onClick={() => handleClick(mechanic)}
                            >
                                <BorderedComponent cornerHeight={CORNER_H}
                                                   cornerWidth={CORNER_W}>
                                    <div className={styles.card}>
                                    <div className={styles.cardHeader}>{mechanic.name}</div>

                                    <div className={styles.cardImage}>
                                        <MinioImage
                                            filled
                                            src={mechanic.logoUrl}
                                            alt={mechanic.name}
                                        />
                                    </div>
                                    <div className={styles.cardDescription}>
                                        <span>{mechanic.description} You can explore the boundless world, uncovering new territories, meeting diverse characters, and intera You can explore the boundless world, uncovering new territories, meeting diverse characters, and intera</span>
                                    </div>
                                    </div>
                                </BorderedComponent>
                            </div>

                    ))}
                </div>
            </div>

            <NextButton onClick={scrollNext} disabled={!canScrollNext}/>
        </div>
    );
};

export default MechanicsCarousel;