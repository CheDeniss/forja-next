import styles from "./GameLibrary.module.css";
import React, {memo, useEffect, useState} from "react";
import ProfileUserGameItem from "./ProfileUserGameItem/ProfileUserGameItem.jsx";
import {getUserGameLibrary} from "@/api/profileService.js";

const GameLibrary = ({userId}) => {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserGameLibrary( userId ).then((data) => {
            setGames(data || []); // Дефолтне значення на випадок, якщо дані пусті
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching games:', error);
            setLoading(false);
        }).finally(() => {
            console.log('Games list fetched successfully');
        });
    }, [userId]);

    return (
        <div className={styles.libraryContainer}>
            <span className="sectionTitle">User Library</span>
            {games.map((game) => (
                <ProfileUserGameItem key={game.id} game={game}/>
            ))}
        </div>
    );
};

// const MemoizedProfileUserGameItem = memo(ProfileUserGameItem);


export default GameLibrary;
