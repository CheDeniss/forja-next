'use client';

import GameHeroSection from '@/components/Catalog_components/GamePage_components/GameHero/GameHeroSection.jsx';
import DlcCard from '@/components/Catalog_components/GamePage_components/DlcCard/DlcCard.jsx';
import GameDescriptionBlock from '@/components/Catalog_components/GamePage_components/GameDescriptionBlock/GameDescriptionBlock.jsx';
import GameDetailsFooter from '@/components/Catalog_components/GamePage_components/GameDetailsFooter/GameDetailsFooter.jsx';
import MechanicsCarousel from '@/components/Catalog_components/GamePage_components/MechanicsCourusel/MechanicsCourusel.jsx';
import styles from './GamePageContent.module.scss';

export default function GamePageContent({ game }) {
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

        </main>
    );
}
