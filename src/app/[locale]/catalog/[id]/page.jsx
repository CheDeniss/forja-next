import styles from '@/app/styles/pageWrapper.module.scss';
import {getGameByIdServer} from "@/api/ServerServices/serverFetchServices.js";
import GameClient from "@/components/Catalog/Game/GameClient/GameClient.jsx";

export default async function GamePage({ params }) {
    const { id } = params;

    const game = await getGameByIdServer(id);

    if (!game) {
        throw new Error('Гра не знайдена');
    }

    return (
        <div className={styles.wrapper}>
            <GameClient game={game}/>
        </div>
    );
}

