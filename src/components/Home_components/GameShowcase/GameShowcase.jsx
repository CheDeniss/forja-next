'use client';

import React, { useEffect, useState } from 'react';
import styles from './GameShowcase.module.scss';
import BorderedComponent from '@/components/ui/BorderedComponent/BorderedComponent.jsx';
import {getLocaleFromCookie} from "@/utils/locale.js";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";

const FALLBACK_IMAGE_URL = '/assets/fallbacks/NoImage.svg';
const CORNER_W = '35px';
const CORNER_H = '35px';

const GameShowcase = ({ games }) => {
    const [preparedGames, setPreparedGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isHovered_1, setIsHovered_1] = useState(false);
    const [isHovered_2, setIsHovered_2] = useState(false);
    const [isHovered_3, setIsHovered_3] = useState(false);
    const [isHovered_4, setIsHovered_4] = useState(false);
    const [isHovered_5, setIsHovered_5] = useState(false);


    const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        const images = await Promise.all((game.images || []).map(preloadImage));
        return { ...game, logoUrl, images };
    };

    const handleClick = (game) => {
        const locale = getLocaleFromCookie();
        const url = `/${locale}/catalog/${game.id}`;
        window.open(url, '_blank');
    };


    useEffect(() => {
        const preloadAllGames = async () => {
            if (!games?.length) {
                setPreparedGames([]);
                setLoading(false);
                return;
            }
            const loadedGames = await Promise.all(games.map(preloadGame));
            setPreparedGames(loadedGames);
            setLoading(false);
        };
        preloadAllGames();
    }, [games]);

    useEffect(() => {
        if (!preparedGames.length) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % preparedGames.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [preparedGames]);

    useEffect(() => {
        setIsImageLoaded(false);
    }, [preparedGames.length ? preparedGames[currentIndex].logoUrl : null]);

    if (loading) return <div className={styles.loader}>Loading...</div>;
    if (!preparedGames.length) return <div className={styles.empty}>No games available</div>;

    const currentGame = preparedGames[currentIndex];
    const imageRight1 = currentGame.images?.[0] || FALLBACK_IMAGE_URL;
    const imageRight2 = currentGame.images?.[1] || FALLBACK_IMAGE_URL;

    return (
        <div className={styles.container}>
            <div
                className={styles.leftSection}
                onMouseEnter={() => setIsHovered_1(true)}
                onMouseLeave={() => setIsHovered_1(false)}
                onClick={() => handleClick(currentGame)}
            >
                <BorderedComponent
                    cornerHeight={CORNER_H}
                    cornerWidth={CORNER_W}
                    borderColor={isHovered_1 ? 'var(--hover-color)' : 'var(--gray-100)'}
                >
                    <div className={styles.imgContainer}>
                        <MinioImage
                            src={currentGame.logoUrl}
                            alt={currentGame.title}
                            onLoad={() => setIsImageLoaded(true)}
                            fallbackSrc={FALLBACK_IMAGE_URL}/>
                    </div>
                </BorderedComponent>
            </div>

            <div className={styles.rightSection}>
                <div
                    className={styles.cell}
                    onMouseEnter={() => setIsHovered_2(true)}
                    onMouseLeave={() => setIsHovered_2(false)}
                    onClick={() => handleClick(currentGame)}
                >
                    <BorderedComponent
                        cornerHeight={CORNER_H}
                        cornerWidth={CORNER_W}
                        borderColor={isHovered_2 ? 'var(--hover-color)' : 'var(--gray-100)'}
                    >
                        <div className={styles.cellContent}>
                            <span className={styles.GTitle}>{currentGame.title}</span>
                            <p className={styles.description}>{currentGame.shortDescription}</p>
                        </div>
                    </BorderedComponent>
                </div>

                <div
                    className={styles.cell}
                    onMouseEnter={() => setIsHovered_3(true)}
                    onMouseLeave={() => setIsHovered_3(false)}
                    onClick={() => handleClick(currentGame)}
                >
                    <BorderedComponent
                        cornerHeight={CORNER_H}
                        cornerWidth={CORNER_W}
                        borderColor={isHovered_3 ? 'var(--hover-color)' : 'var(--gray-100)'}
                    >
                        <img src={imageRight1} alt="Additional Art 1" />
                    </BorderedComponent>
                </div>

                <div
                    className={styles.cell}
                    onMouseEnter={() => setIsHovered_4(true)}
                    onMouseLeave={() => setIsHovered_4(false)}
                    onClick={() => handleClick(currentGame)}
                >
                    <BorderedComponent
                        cornerHeight={CORNER_H}
                        cornerWidth={CORNER_W}
                        borderColor={isHovered_4 ? 'var(--hover-color)' : 'var(--gray-100)'}
                    >
                        <img src={imageRight2} alt="Additional Art 2" />
                    </BorderedComponent>
                </div>

                <div
                    className={styles.cell}
                    onMouseEnter={() => setIsHovered_5(true)}
                    onMouseLeave={() => setIsHovered_5(false)}
                    onClick={() => handleClick(currentGame)}
                >
                    <BorderedComponent
                        cornerHeight={CORNER_H}
                        cornerWidth={CORNER_W}
                        borderColor={isHovered_5 ? 'var(--hover-color)' : 'var(--gray-100)'}
                    >
                        <div className={styles.cellContent} style={{ justifyContent: 'space-between' }}>
                            <div>
                                <span className={styles.recordName}>GENRE:</span><br />
                                <span className={styles.recordValue}>{currentGame.genres?.join(', ') || 'N/A'}</span>
                            </div>
                            <div>
                                <span className={styles.recordName}>TAGS:</span><br />
                                <span className={styles.recordValue}>{currentGame.tags?.join(', ') || 'N/A'}</span>
                            </div>
                            <div>
                                <span className={styles.recordName}>RELEASE DATE:</span><br />
                                <span className={styles.recordValue}>{new Date(currentGame.releaseDate).toLocaleDateString() || 'N/A'}</span>
                            </div>
                            <div>
                                <span className={styles.recordName}>DEVELOPER:</span><br />
                                <span className={styles.recordValue}>{currentGame.developer || 'N/A'}</span>
                            </div>
                        </div>
                    </BorderedComponent>
                </div>
            </div>
        </div>
    );
};

export default GameShowcase;
