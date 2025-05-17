'use client';

import userInfoStyles from "./UserInfo.module.scss";
import {useParams, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import React, {useEffect, useState} from "react";
import {getUserProfileHatImages} from "@/api/ClientServices/profileService.js";
import {Skeleton} from "@mui/material";
import CustomButtonFollow from "@/components/ui/CustomButtonFollow/CustomButtonFollow.jsx";

const UserInfo = ({user, myId, isIFollowing, recordId}) => {
    console.log('UserInfo - user:', user, myId, isIFollowing, recordId);
    const { t } = useTranslation();
    const router = useRouter();
    const [hatUrl, setHatUrl] = useState(null);

    useEffect(() => {
        if (!user?.profileHatVariant) return;

        getUserProfileHatImages(user.profileHatVariant)
            .then(path => setHatUrl(path))
            .catch(err => console.error(err));

    }, [user?.profileHatVariant]);


    return (
        <div className={userInfoStyles.userInfoContainer}>

            <div className={userInfoStyles.avatarContainer}>
                <MinioImage width='86%' src={user.avatarUrl} alt="Avatar"/>
            </div>

            <div className={userInfoStyles.profileHero}>
                <div className={userInfoStyles.userDetails}>
                    <span className={userInfoStyles.userDetailsUsername}>
                        {user.firstname || user.lastname ?
                            `${user.firstname ?? ""} ${user.lastname ?? ""}` : user.username}
                    </span>

                    {user.customUrl && (
                        <span className={userInfoStyles.userDetailsOtherData}>
                            {user.customUrl}
                        </span>
                    )}

                    <textarea
                        className={userInfoStyles.userDetailsBio}
                        value={user.selfDescription ?? ''}
                        disabled={true}>
                    </textarea>

                    {myId !== user.id && (
                        <div className={userInfoStyles.userDetailsButtons}>
                            <CustomButtonFollow followedId={user.id}
                                                followerId={myId}
                                                recordId={recordId}
                                                initiallyFollowing={isIFollowing}
                            />
                        </div>)}
                </div>
                <div className={userInfoStyles.backgroundImage}>
                    <MinioImage key={hatUrl}
                                src={hatUrl || 'public/assets/fallbacks/NoImage.svg'}
                                alt="Profile Background"/>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
