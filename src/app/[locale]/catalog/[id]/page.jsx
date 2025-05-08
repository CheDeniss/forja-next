import { getGameById } from '@/api/catalogService';
import GamePageContent from '@/components/Catalog_components/GamePage_components/GamePageContent/GamePageContent.jsx';
import styles from './GamePage.module.scss';

export default async function GamePage({ params }) {
    const { id } = params;

    const game = await getGameById(id);

    if (!game) {
        throw new Error('Гра не знайдена');
    }

    return (
        <div className={styles.wrapper}>
            <GamePageContent game={game}/>
        </div>
    );
}

