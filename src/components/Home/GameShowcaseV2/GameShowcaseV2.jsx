'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styles from './GameShowcaseV2.module.scss';
import BorderedComponent from '@/components/ui/BorderedComponent/BorderedComponent.jsx';
import MinioImage from '@/components/ui/MinioImage/MinioImage.jsx';
import { getLocaleFromCookie } from '@/utils/locale';
import {Skeleton} from "@mui/material";

const FALLBACK_IMAGE_URL = '/assets/fallbacks/NoImage.svg';
const CORNER_W = '35px';
const CORNER_H = '35px';

const GameShowcaseV2 = ({ games }) => {
    const [preparedGames, setPreparedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [Autoplay({ delay: 4000, stopOnInteraction: true })]
    );
    const [animateSkeleton, setAnimateSkeleton] = useState(false);

    const preloadImage = (url) => {
        return new Promise((resolve) => {
            if (!url) return resolve(FALLBACK_IMAGE_URL);
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(url);
            img.onerror = () => resolve(FALLBACK_IMAGE_URL);
        });
    };

    const preloadGame = async (game) => {
        const logoUrl = await preloadImage(game.logoUrl);
        const images = await Promise.all((game.images || []).slice(0, 3).map(preloadImage));
        return { ...game, logoUrl, images };
    };

    useEffect(() => {
        if (games == null) {
            return;
        }

        const preloadInitialGames = async () => {
            if (!games?.length) {
                setPreparedGames([]);
                setLoading(false);
                return;
            }
            setAnimateSkeleton(true);

            const firstGames = await Promise.all(games.slice(0, 2).map(preloadGame));

            setPreparedGames(firstGames);
            setAnimateSkeleton(false);
            setLoading(false);

            preloadRestGames();
        };

        const preloadRestGames = async () => {
            const restGames = await Promise.all(games.slice(2).map(preloadGame));
            setPreparedGames(prev => [...prev, ...restGames]);
        };

        preloadInitialGames();
    }, [games]);

    const handleClick = (game) => {
        const locale = getLocaleFromCookie();
        const url = `/${locale}/catalog/${game.id}`;
        window.open(url, '_blank');
    };

    if (games == null) {
        // TODO заглушку помилки
    }

    if (loading) {
        return (
            <div className={`${styles.skeletonContainer} ${animateSkeleton ? styles.expand : ''}`}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                    style={{
                        backgroundColor: 'var(--gray-800)',
                    }}
                />
                <span className={styles.skeletonText}>Loading showcase...</span>
            </div>
        );
    }

    if (games.length === 0) {
        return (
            <div className={styles.empty}>
                No games available
            </div>
        );
    }

    return (
        <div className={styles.embla}>
            <div className={styles.emblaViewport} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    {preparedGames.map((game) => {
                        const imageRight1 = game.images?.[0] || FALLBACK_IMAGE_URL;
                        const imageRight2 = game.images?.[1] || FALLBACK_IMAGE_URL;

                        return (
                            <div className={styles.emblaSlide} key={game.id}>
                                <div className={styles.container}>
                                    {/* Ліва частина */}
                                    <div className={styles.leftSection} onClick={() => handleClick(game)}>
                                        <BorderedComponent cornerHeight={CORNER_H} cornerWidth={CORNER_W}>
                                            <div className={styles.imgContainer}>
                                                <MinioImage
                                                    src={game.logoUrl}
                                                    alt={game.title}
                                                    fallbackSrc={FALLBACK_IMAGE_URL}
                                                    pointer={true}
                                                    className={styles.mainImage} // Обов'язково клас для розтягування
                                                />
                                            </div>
                                        </BorderedComponent>
                                    </div>

                                    {/* Права частина */}
                                    <div className={styles.rightSection}>
                                        <div className={styles.cell} onClick={() => handleClick(game)}>
                                            <BorderedComponent cornerHeight={CORNER_H} cornerWidth={CORNER_W}>
                                                <div className={styles.cellContent}>
                                                    <span className={styles.GTitle}>{game.title}</span>
                                                    <p className={styles.description}>{game.shortDescription}</p>
                                                </div>
                                            </BorderedComponent>
                                        </div>

                                        <div className={styles.cell} onClick={() => handleClick(game)}>
                                            <BorderedComponent cornerHeight={CORNER_H} cornerWidth={CORNER_W}>
                                                <img src={imageRight1} alt="Art 1" className={styles.image}
                                                     loading="lazy"/>
                                            </BorderedComponent>
                                        </div>

                                        <div className={styles.cell} onClick={() => handleClick(game)}>
                                            <BorderedComponent cornerHeight={CORNER_H} cornerWidth={CORNER_W}>
                                                <img src={imageRight2} alt="Art 2" className={styles.image}
                                                     loading="lazy"/>
                                            </BorderedComponent>
                                        </div>

                                        <div className={styles.cell} onClick={() => handleClick(game)}>
                                            <BorderedComponent cornerHeight={CORNER_H} cornerWidth={CORNER_W}>
                                                <div className={styles.cellContent}
                                                     style={{justifyContent: 'space-between'}}>
                                                    <div>
                                                        <span
                                                            className={styles.recordName}>GENRE:
                                                        </span>
                                                        <br/>
                                                        <span
                                                            className={styles.recordValue}>{game.genres?.join(', ') || 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={styles.recordName}>TAGS:
                                                        </span>
                                                        <br/>
                                                        <span
                                                            className={styles.recordValue}>{game.tags?.join(', ') || 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={styles.recordName}>RELEASE DATE:
                                                        </span>
                                                        <br/>
                                                        <span
                                                            className={styles.recordValue}>{new Date(game.releaseDate).toLocaleDateString() || 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={styles.recordName}>DEVELOPER:
                                                        </span>
                                                        <br/>
                                                        <span
                                                            className={styles.recordValue}>{game.developer || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </BorderedComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                            ;
                    })}
                </div>
            </div>
        </div>
    );
};

export default GameShowcaseV2;
