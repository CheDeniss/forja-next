'use client';

import userInfoStyles from "./UserInfo.module.scss";
import {useParams, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import CustomButtonOther from "../../ui/CustomButtonOther/CustomButtonOther.jsx";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";
import React, {useEffect, useState} from "react";
import {getUserProfileHatImages} from "@/api/profileService.js";
import {Skeleton} from "@mui/material";

const UserInfo = ({logout, user}) => {
    const {locale} = useParams();
    const { t } = useTranslation();
    const router = useRouter();
    const [hatUrl, setHatUrl] = useState(null);

    useEffect(() => {
        if (!user?.profileHatVariant) return;

        getUserProfileHatImages(user.profileHatVariant)
            .then(path => setHatUrl(path))
            .catch(err => console.error(err));

    }, [user?.profileHatVariant]);

    const handleLogout = async () => {
        await logout();
        router.push(`/${locale}`);
    }

    const handleEditPage = () => {
        router.push(`/${locale}/profile/settings`);
    }

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

                    {/*<span className={userInfoStyles.userDetailsOtherData}>*/}
                    {/*    {user.country || user.city ?*/}
                    {/*        `${user.country ?? ""} · ${user.city ?? ""}` : ""}*/}
                    {/*</span>*/}

                    {/*<span className={userInfoStyles.userDetailsOtherData}>*/}
                    {/*    {user.phoneNumber || user.birthDate || user.gender ?*/}
                    {/*        `${user.phoneNumber ?? ""} · ${user.birthDate ?? ""} · ${user.gender ?? ""}` : ""}*/}
                    {/*</span>*/}

                    <textarea className={userInfoStyles.userDetailsBio} value={user.selfDescription} disabled={true}>
                    </textarea>
                    <div className={userInfoStyles.userDetailsButtons}>
                        <CustomButtonOther onClick={handleEditPage}>
                            Edit page
                        </CustomButtonOther>
                        <CustomButtonOther onClick={handleLogout}>
                            Logout
                        </CustomButtonOther>
                    </div>
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
