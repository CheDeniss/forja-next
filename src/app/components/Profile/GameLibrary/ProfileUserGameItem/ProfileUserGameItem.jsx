import React from 'react';
import styles from './ProfileUserGameItem.module.scss';
import GameAchieve
    from "@/app/components/Profile/GameLibrary/ProfileUserGameItem/GameDlcAchive/GameAchive/GameAchieve.jsx";
import GameDlc from "@/app/components/Profile/GameLibrary/ProfileUserGameItem/GameDlcAchive/GameDlc/GameDlc.jsx";
import AchievementProgress
    from "@/app/components/Profile/GameLibrary/ProfileUserGameItem/GameInfo/AchievementProgress/AchievementProgress.jsx";
import MinioImage from "@/app/components/ui/MinioImage/MinioImage.jsx";
import BorderedComponent from "@/app/components/ui/BorderedComponent/BorderedComponent.jsx";
const ProfileUserGameItem = ({ mechanic }) => {

    // {
    //     "id": "a1786fc0-dade-4ba8-a527-9636efd4315e",
    //     "userId": "b2f4ebe9-d240-4f35-9a78-0c4aaa18aa6c",
    //     "mechanic": {
    //     "id": "92abc22e-7f8c-4a20-b371-ec099b04d9b4",
    //         "title": "Adventure Quest",
    //         "shortDescription": "Explore the unknown!",
    //         "logoUrl": "http://localhost:9000/forja-data/https%3A/example.com/adventure-quest.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250418%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250418T120049Z&X-Amz-Expires=1900&X-Amz-SignedHeaders=host&X-Amz-Signature=6d8747e55b3198d90f00dd72aaee10ea86ca7900c83fa98a7c41a41b4de04747"
    // },
    //     "timePlayed": null,
    //     "purchaseDate": "2025-03-12T12:22:39.363233Z",
    //     "totalGameAchievements": 11,
    //     "completedAchievements": [
    //     {
    //         "id": "8f8911dd-dd48-4935-90c0-b68ad925ac41",
    //         "name": "Перший переможець",
    //         "logoUrl": "http://localhost:9000/forja-data/https%3A/example.com/achievement-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250418%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250418T120049Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=542887fdce792e855f8904ce79da6a1c4283a41702069061770dbd59b34c85cb"
    //     }
    // ],
    //     "addons": [ {
    //         "id": "c9c31b9a-48e8-41bd-8d97-78b9a9b30d07",
    //         "userLibraryGameId": "c87a0e1a-907b-41d8-839e-8d6a8c43a729",
    //         "gameAddon": {
    //           "id": "47732ded-1fc8-450b-8f93-479a86f475ee",
    //           "title": "Ocean's Call: Deep Sea Expansion",
    //           "shortDescription": "Dive into the abyss!",
    //           "logoUrl": "http://localhost:9000/forja-data/https%3A/example.com/addons/oceans-call-deep-sea.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250418%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250418T120049Z&X-Amz-Expires=1900&X-Amz-SignedHeaders=host&X-Amz-Signature=5bd036e833b0f5a0e7af8a7c449473fad8f935e065c69be7cc813130bb7a5099"
    //         },
    //         "purchaseDate": "2025-03-27T17:24:01.318725Z"
    //       },
    //       {
    //         "id": "dc7f5f75-a47c-4200-bebb-745530d5f062",
    //         "userLibraryGameId": "c87a0e1a-907b-41d8-839e-8d6a8c43a729",
    //         "gameAddon": {
    //           "id": "971f9957-3430-48c5-84d6-d61f83754b1f",
    //           "title": "Shadow Realms: Haunted Fortress",
    //           "shortDescription": "Face the ultimate horror!",
    //           "logoUrl": "http://localhost:9000/forja-data/https%3A/example.com/addons/shadow-realms-haunted-fortress.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250418%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250418T120049Z&X-Amz-Expires=1900&X-Amz-SignedHeaders=host&X-Amz-Signature=773426c96c8181b91635d3f9c3a3fc9b2233ed81b90f7b4129d95a0b4a7f5631"
    //         },
    //         "purchaseDate": "2025-03-27T15:39:39.848797Z"
    //       }]
    // },

    const progress = mechanic.totalGameAchievements > 0
        ? Math.round((mechanic.completedAchievements.length / mechanic.totalGameAchievements) * 100)
        : 0;

    return (
        <div className={styles.container}>
                <div className={styles.left}>
                    <BorderedComponent cornerWidth='10%' cornerHeight='12%'>
                        <MinioImage src={mechanic.mechanic.logoUrl} alt="Game Logo"/>
                    </BorderedComponent>
                </div>


                <BorderedComponent cornerWidth='10%' cornerHeight='12%'>
                    <div className={styles.center}>
                        <div>
                            <AchievementProgress progress={progress}/>
                            <span className={styles.title}>{mechanic.mechanic.title}</span>
                        </div>
                    </div>
                </BorderedComponent>

                <div className={styles.right}>
                    <BorderedComponent cornerWidth='10%' cornerHeight='12%'>
                        <div className={styles.rightContent}>
                            <GameAchieve achievements={mechanic.completedAchievements}
                                         total={mechanic.totalGameAchievements}
                                         gameId={mechanic.mechanic.id}/>
                            <GameDlc addons={mechanic.addons}/>
                        </div>
                    </BorderedComponent>
                </div>
        </div>
);
};

export default ProfileUserGameItem;
