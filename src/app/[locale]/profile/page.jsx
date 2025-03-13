import React from 'react';
import profileStyles from "./Profile.module.scss";

import UserInfo from "../../../app/components/Profile/UserInfo/UserInfo.jsx";
import UserStats from "../../../app/components/Profile/UserStats/UserStats.jsx";
import GameLibrary from "../../../app/components/Profile/GameLibrary/GameLibrary.jsx";

const Profile = () => {
    return (
        <div className={profileStyles.profileContainer}>
            {/*<UserInfo/>*/}
            <UserStats/>
            <GameLibrary/>
        </div>
    );
};

export default Profile;
