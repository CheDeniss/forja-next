'use client';

import userInfoStyles from "./UserInfo.module.css";
import Image from "next/image";
import ava from "../../../../../public/assets/images/profile/Recovered_jpg_file(1526).jpg";
import {useParams, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import CustomButtonOther from "../../../components/ui/CustomButtonOther/CustomButtonOther";
import {useEffect, useState} from "react";
import {getImageURL} from "../../../../api/profileService.js";

const UserInfo = ({logout, user}) => {
    const {locale} = useParams();
    const { t } = useTranslation();
    const router = useRouter();
    const [ava, setAva] = useState('');

    useEffect(() => {
        console.log(" user.avatarUrl", user.avatarUrl);

        const fetchAvatar = async () => {
            if (user.avatarUrl) {

                try {
                    const response = await getImageURL(user.avatarUrl);
                    if (response) {
                        console.log("ava", response);
                        setAva(response); // якщо хочеш встановити аватарку
                    }
                } catch (error) {
                    console.error("Error fetching avatar:", error);
                }
            }
        };

        fetchAvatar(); // викликаємо функцію
    }, [user]);



    const handleLogout = async () => {
        await logout();
        router.push(`/${locale}`);
    }

    return (
        <div className={userInfoStyles.userInfoContainer}>
            <div className={userInfoStyles.avatarContainer}>
                {/*<Image className={userInfoStyles.avatarka} src={ava} alt={"avatarka"}/>*/}
            </div>

            <div className={userInfoStyles.userDetails}>
                <span className={userInfoStyles.userDetailsUsername}>
                    {user.username}
                    {user.firstname || user.lastname ?
                        ` · ${user.firstname ?? ""} ${user.lastname ?? ""}` : ""}
                </span>

                <span className={userInfoStyles.userDetailsOtherData}>
                    {user.country || user.city ?
                        `${user.country ?? ""} · ${user.city ?? ""}` : ""}
                </span>

                {/*<span className={userInfoStyles.userDetailsOtherData}>*/}
                {/*    {user.phoneNumber || user.birthDate || user.gender ?*/}
                {/*        `${user.phoneNumber ?? ""} · ${user.birthDate ?? ""} · ${user.gender ?? ""}` : ""}*/}
                {/*</span>*/}

                <textarea className={userInfoStyles.userDetailsBio} value={user.selfDescription} disabled={true}>
                </textarea>
                <div className={userInfoStyles.userDetailsButtons}>
                    <CustomButtonOther >
                        Edit page
                    </CustomButtonOther>
                    <CustomButtonOther onClick={handleLogout}>
                        Logout
                    </CustomButtonOther>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
