'use client';

import React, {useEffect, useState} from 'react';
import styles from './GamePage.module.scss';
import {useParams} from "next/navigation";
import {getGameById} from "@/api/catalogService.js";
import GameHeroSection from "@/components/Catalog_components/GamePage_components/GameHero/GameHeroSection.jsx";
import Loader from "@/components/ui/Loader/Loader.jsx";
import DlcCard from "@/components/Catalog_components/GamePage_components/DlcCard/DlcCard.jsx";
import {Skeleton} from "@mui/material";
import GameDescriptionBlock
    from "@/components/Catalog_components/GamePage_components/GameDescriptionBlock/GameDescriptionBlock.jsx";
import GameDetailsFooter
    from "@/components/Catalog_components/GamePage_components/GameDetailsFooter/GameDetailsFooter.jsx";
import MechanicsCarousel
    from "@/components/Catalog_components/GamePage_components/MechanicsCourusel/MechanicsCourusel.jsx";

//TODO зробити кнопку адд ту вішліст, протестувати на іграх з різним наповненням.

const GamePage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const OPTIONS = { loop: true,
        align: 'start',
        skipSnaps: false}

    useEffect(() => {
        const fetchGame = async () => {
            setLoading(true);
            try {
                const fetchedGame = await getGameById(id);
                setGame(fetchedGame);
            } catch (error) {
                console.error('Error fetching game:', error);
            } finally {
                setLoading(false);
                console.log('Game fetched:', game);
            }
        };

        if (id) fetchGame();
    }, [id]);


    if (!game || loading) {
        return <Loader loading={loading} />;
    }

    return (
        <main className={styles.container}>
            {/*Галерея, опис*/}
            {!game ? (
                <Skeleton variant="rectangular"
                          width="100%"
                          height={400}
                          animation="wave"/>
            ) : (
                <GameHeroSection game={game}/>
            )}
            {/* остання DLC */}
            <div className={styles.hrline}></div>
            <DlcCard latestDlc={game.addons[0]}/>

            {/* Опис, системні вимоги */}
            <div className={styles.hrline}></div>
            <GameDescriptionBlock description={game.description}
                                  systemRequirements={game.systemRequirements}
            />

            {/* Деталі */}
            <div className={styles.hrline}></div>
            <GameDetailsFooter matureContent={game.matureContent}
                               audioLanguages={game.audioLanguages}
                               subtitlesLanguages={game.subtitlesLanguages}
                               interfaceLanguages={game.interfaceLanguages}
            />


            {/* Карусель механік */}
            <div className={styles.hrline}></div>
            <MechanicsCarousel mechanics={game.mechanics} options={OPTIONS}/>

        </main>
    );
};

export default GamePage;