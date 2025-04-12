'use client';

import React, {useEffect, useState} from 'react';
import styles from './GamePage.module.scss';
import {useParams} from "next/navigation";
import {getGameById} from "../../../../api/catalogService.js";
import GameHeroSection from "../../../components/Catalog_components/GamePage_components/GameHeroSection.jsx";
import Loader from "../../../components/ui/Loader/Loader.jsx";

const GamePage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

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
            }
        };

        if (id) fetchGame();
    }, [id]);


    if (!game || loading) {
        return <Loader loading={loading} />;
    }

    return (
        <main className={styles.container}>
            <GameHeroSection game={game} />
        </main>
    );
};

export default GamePage;