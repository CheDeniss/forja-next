'use client';

import profileStyles from "./Profile.module.scss";
import { useAuth } from "../../../context/authContext";

import UserInfo from "../../../app/components/Profile/UserInfo/UserInfo.jsx";
import UserStats from "../../../app/components/Profile/UserStats/UserStats.jsx";
import GameLibrary from "../../../app/components/Profile/GameLibrary/GameLibrary.jsx";

const Profile = () => {
    const { user, isAuthLoading, logout } = useAuth();

    if (!user) {
        return <p>... user is not loaded ...</p>;
    }

    return (
        <div className={profileStyles.profileContainer}>
            <UserInfo logout={logout} user={user}/>
            <UserStats userId={user.id}/>
            <GameLibrary userId={user.id}/>
        </div>
    );
};

export default Profile;
