import styles from "./GameLibrary.module.css";
import React, {memo, useEffect, useState} from "react";
import ProfileUserGameItem from "./ProfileUserGameItem/ProfileUserGameItem.jsx";
import {getUserGameLibrary} from "@/api/ClientServices/libraryService.js";

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

    if(games.length === 0) {
        return <span className="no_Items_Found">Library is empty yet </span>;
    }

    return (
        <div className={styles.libraryContainer}>
            {games.map((game) => (
                <ProfileUserGameItem key={game.id} game={game}/>
            ))}
        </div>
    );
};

// const MemoizedProfileUserGameItem = memo(ProfileUserGameItem);


export default GameLibrary;
