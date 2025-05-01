'use client'

import useEmblaCarousel from 'embla-carousel-react'
import {useEffect, useCallback, useState} from 'react'
import styles from './GameCarousel.module.scss'
import {NextButton, PrevButton} from "@/app/components/Home_components/GenreCarousel/EmblaCarouselArrowButtons.jsx";
import MinioImage from "@/app/components/ui/MinioImage/MinioImage.jsx";
import {getLocaleFromCookie} from "@/utils/locale.js";

const GameCarousel = ({ games = [], options }) => {
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

    const handleClick = (game) => {
        const locale = getLocaleFromCookie();
        const url = `/${locale}/catalog/${game.id}`;
        window.open(url, '_blank');
    };

    if (!games.length) {
        return <div className={styles.empty}>No games available</div>;
    }

    return (
        <div className={styles.carousel}>
            <PrevButton onClick={scrollPrev} disabled={!canScrollPrev} />

            <div className={styles.viewport} ref={emblaRef}>
                <div className={styles.container}>
                    {games.map((game, index) => (
                        <div className={styles.slide}
                             key={game.id}
                             onClick={() => handleClick(game)}
                        >
                            <div className={styles.imageWrapper}>
                                <MinioImage
                                    filled
                                    src={game.logoUrl}
                                    alt={game.title}
                                    fallback="/assets/fallbacks/NoImage.svg"
                                />
                            </div>
                            <span className={styles.title}>{game.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <NextButton onClick={scrollNext} disabled={!canScrollNext} />
        </div>
    );
};

export default GameCarousel;