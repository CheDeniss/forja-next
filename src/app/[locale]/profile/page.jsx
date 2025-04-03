'use client';

import profileStyles from "./Profile.module.scss";
import { useAuth } from "../../../context/authContext";

import UserInfo from "../../../app/components/Profile/UserInfo/UserInfo.jsx";
import UserStats from "../../../app/components/Profile/UserStats/UserStats.jsx";
import GameLibrary from "../../../app/components/Profile/GameLibrary/GameLibrary.jsx";
import Loader from "../../components/ui/Loader/Loader.jsx";
import React from "react";

const Profile = () => {
    const { user, isAuthLoading, logout } = useAuth();

    if(!user){
        return <Loader isLoading={isAuthLoading} />
    }

    return (
        <div className={profileStyles.profileContainer}>
            <Loader isLoading={isAuthLoading} />
            <UserInfo logout={logout} user={user}/>
            <UserStats userId={user.id}/>
            <GameLibrary userId={user.id}/>
        </div>
    );
};

export default Profile;
