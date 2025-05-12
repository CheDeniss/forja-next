'use client';

import profileStyles from "./Profile.module.scss";
import { useAuth } from "@/context/AuthContext.js";
import UserInfo from "@/components/Profile/MyProfile/UserInfo/UserInfo.jsx";
import UserStats from "@/components/Profile/MyProfile/UserStats/UserStats.jsx";
import GameLibrary from "@/components/Profile/MyProfile/GameLibrary/GameLibrary.jsx";
import Loader from "@/components/ui/Loader/Loader.jsx";
import React from "react";

const Profile = () => {
    const { user, isAuthLoading, logout } = useAuth();

    if(!user){
        return <Loader isLoading={isAuthLoading} />
    }

    return (
        <div className={profileStyles.profileContainer}>
            <Loader isLoading={isAuthLoading}/>
            <UserInfo logout={logout} user={user}/>
            <UserStats userId={user.id}/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <span className="sectionTitle">User Library</span>
                <GameLibrary userId={user.id}/>
            </div>
        </div>
    );
};

export default Profile;
