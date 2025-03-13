import styles from "./GameLibrary.module.css";
import PlayButton from "../ui/PlayButton";
import UninstallButton from "../ui/UninstallButton";

const games = [
    { id: 1, title: "GAME NAME1 ULTIMATE", achievements: "23/50", dlc: "5/10", lastPlayed: "30 Jan", playTime: "23 hrs" },
    { id: 2, title: "GAME NAME2", achievements: "12/40", dlc: "3/5", lastPlayed: "25 Jan", playTime: "15 hrs" }
];

const GameLibrary = () => {
    return (
        <div className={styles.libraryContainer}>
            {games.map((game) => (
                <div key={game.id} className={styles.gameItem}>
                    <div className={styles.gameInfo}>
                        <h3>{game.title}</h3>
                        <p>Last played on {game.lastPlayed} - {game.playTime} on record</p>
                    </div>
                    <div className={styles.gameActions}>
                        <UninstallButton />
                        <PlayButton />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameLibrary;
