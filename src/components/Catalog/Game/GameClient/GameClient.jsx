'use client';

import GameHeroSection from '@/components/Catalog/Game/GameHero/GameHeroSection.jsx';
import DlcCard from '@/components/Catalog/Game/DlcCard/DlcCard.jsx';
import GameDescriptionBlock from '@/components/Catalog/Game/GameDescriptionBlock/GameDescriptionBlock.jsx';
import GameDetailsFooter from '@/components/Catalog/Game/GameDetailsFooter/GameDetailsFooter.jsx';
import MechanicsCarousel from '@/components/Catalog/Game/MechanicsCourusel/MechanicsCourusel.jsx';
import styles from './GameClient.module.scss';
import ReviewList from "@/components/Catalog/Game/Review/ReviewList.jsx";

export default function GameClient({ game }) {
    const OPTIONS = { loop: true, align: 'start', skipSnaps: false };

    return (
        <main className={styles.container}>
            {/*Галерея, опис*/}
            <GameHeroSection game={game}/>

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

            {/* Карусель Відгуки */}
            <div className={styles.hrline}></div>
            <ReviewList gameId={game.id} gameName={game.title}/>
        </main>
    );
}
