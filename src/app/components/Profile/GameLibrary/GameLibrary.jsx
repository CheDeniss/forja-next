import styles from "./GameLibrary.module.css";
import {memo, useEffect, useState} from "react";
import ProfileUserGameItem from "./ProfileUserGameItem/ProfileUserGameItem.jsx";

const GameLibrary = (userId) => {
    const [games, setGames] = useState([])

    // useEffect(() => {
    //     getUsersFriendsList( userId ).then((data) => {
    //         setFriendsList(data || []); // Дефолтне значення на випадок, якщо дані пусті
    //         setLoading(false);
    //     }).catch((error) => {
    //         console.error('Error fetching friends:', error);
    //         setLoading(false);
    //     }).finally(() => {
    //         console.log('Friends list fetched successfully', friendsList);
    //     });
    // }, [userId]);

    return (
        <div className={styles.libraryContainer}>
            {/*{games.map((game) => (*/}
            {/*    <ProfileUserGameItem key={game.id} game={game} />*/}
            {/*))}*/}
        </div>
    );
};

// const MemoizedProfileUserGameItem = memo(ProfileUserGameItem);


export default GameLibrary;
