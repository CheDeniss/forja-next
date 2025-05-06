
import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons.jsx';
import { DotButton, useDotButton } from './EmblaCarouselDotButton.jsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './embla.css';
import {getLocaleFromCookie} from "@/utils/locale.js";

const TWEEN_FACTOR_BASE = 0.3;
const MIN_SCALE = 0.5;

const numberWithinRange = (number, min, max) =>
    Math.min(Math.max(number, min), max);

const GenreCarousel = ({ genres, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef([]);
    const router = useRouter();

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

   const setTweenNodes = useCallback((emblaApi) => {
        tweenNodes.current = emblaApi.slideNodes()
            .map((slideNode) => slideNode.querySelector('.embla__slide__number'))
            .filter((node) => node !== null && node !== undefined);

    }, []);


    const setTweenFactor = useCallback((emblaApi) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);

    const tweenScale = useCallback((emblaApi, eventName) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === 'scroll';

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                // if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();
                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);
                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const distance = Math.abs(diffToTarget * tweenFactor.current);
                const tweenNode = tweenNodes.current[slideIndex];
                if (!tweenNode) return;
                // console.log(`Slide ${slideIndex}: diffToTarget=${diffToTarget}, distance=${distance}`);

                let translateX = '0%';
                let opacity = '0';

                if (diffToTarget >= 0 && distance < 0.1 && distance >= 0) {
                    translateX = '0%';
                    opacity = '1';
                } else if (diffToTarget <= 0 && distance < 0.1 && distance >= 0) {
                    translateX = '0%';
                    opacity = '1';
                }

                if (diffToTarget < 0 && distance < 0.4 && distance > 0.1) {
                    translateX = '15%';
                    opacity = '0.7';
                } else if (diffToTarget > 0 && distance < 0.4 && distance > 0.1) {
                    translateX = '-15%';
                    opacity = '0.7';
                }

                if (diffToTarget < 0 && distance > 0.4 && distance < 0.7) {
                    translateX = '55%';
                    opacity = '0.5';
                } else if (diffToTarget > 0 && distance > 0.4 && distance < 0.7) {
                    translateX = '-55%';
                    opacity = '0.5';
                }


                const tweenValue = 1 - distance;
                const scale = numberWithinRange(tweenValue, MIN_SCALE, 1).toString();
                tweenNode.style.transform = `translateX(${translateX}) scale(${scale})`;

                if (distance > 0.61 && distance < 2) {
                    tweenNode.style.opacity = '0.5';
                } else {
                    tweenNode.style.opacity = opacity;
                }

            });
        });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi);

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenScale)
            .on('scroll', tweenScale)
            .on('slideFocus', tweenScale);
    }, [emblaApi, tweenScale]);


    const handleClick = (index, genreName) => {
        const locale = getLocaleFromCookie();
        const url = `/${locale}/catalog?genres=${encodeURIComponent(genreName)}`;

        if (index === selectedIndex) {
            window.open(url, '_blank');
        } else {
            emblaApi.scrollTo(index);
        }
    };

    return (
        <div className="embla">
            {genres.length > 0 && (
                <div className="light__effect">
                    <Image
                        src="/assets/images/EmblaCarousel/light-platform_home-page.svg"
                        alt="Light"
                        width={300}
                        height={500}
                    />
                </div>
            )}
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {genres.map((genre, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number" onClick={() => handleClick(index, genre.name)}>
                                <Image
                                    src={`/assets/images/Genres/${genre.name}.png`}                                    alt={`Image ${index}`}
                                    width={300}
                                    height={400}
                                    style={{width: '100%', height: 'auto'}}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenreCarousel;
