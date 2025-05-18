import React, {useEffect, useState} from 'react';
import styles from "./MainHome.module.scss";
import {getGenres, getHomePage} from "@/api/ClientServices/homeService.js";
import {useModal} from "@/context/ModalContext.jsx";
import GenreCarousel from "@/components/Home/GenreCarousel/GenreCarousel.jsx";
import {Skeleton} from "@mui/material";
import SpecialOffers from "@/components/Home/SpecialOffers/SpecialOffers.jsx";
import GameCarousel from "@/components/Home/GameCarousel/GameCarousel.jsx";
import GameShowcaseV2 from "@/components/Home/GameShowcaseV2/GameShowcaseV2.jsx";


const MainHome = () => {
    const [genres, setGenres] = useState([])
    const [homePageData, setHomePageData] = useState([])
    const { showModal } = useModal();
    const OPTIONS = { loop: true,
                           skipSnaps: false,
                           containScroll: '',
                           inViewThreshold: 0.5}

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch (error) {
                showModal({modalType: 'error',
                    modalProps: {message: 'Error fetching genres'}
                });
            }
        };

        const fetchHomePageData = async () => {
            try {
                const data = await getHomePage();
                setHomePageData(data);
            } catch (error) {
                showModal({modalType: 'error',
                    modalProps: {message: 'Error fetching home page data'}
                });
            }
        }
        fetchHomePageData();
        fetchGenres();
    }, []);

    return (
        <div>
            <div className={styles.container}>
                {/* FEATURED & RECOMMENDED: */}
                <div className={styles.field}>
                    <label>FEATURED & RECOMMENDED:</label>
                    {!homePageData ? (
                        <Skeleton variant="rectangular" width="100%" height={400} animation="wave"  />
                    ) : (
                        <GameShowcaseV2 games={homePageData.games} />
                    )}
                </div>

                {/* Popular Genres */}
                <div className={styles.field}>
                    <div className={styles.hrline}></div>
                    <label>Popular Genres</label>
                    <GenreCarousel genres={genres} options={ OPTIONS }/>
                </div>

                {/* SPECIAL OFFERS */}
                <div className={styles.field}>
                    <div className={styles.hrline}></div>
                    <label>SPECIAL OFFERS</label>
                    <SpecialOffers games={homePageData.discountedProducts}/>
                </div>

                {/* Featured */}
                <div className={styles.field}>
                    <div className={styles.hrline}></div>
                    <label>Featured</label>
                    <GameCarousel games={homePageData.allGamesShort} options={ OPTIONS }/>
                </div>
            </div>
        </div>
    );
};

export default MainHome;
