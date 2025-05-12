import React from 'react';
import frItemStyles from './FriendItem.module.scss';
import Image from "next/image";
import pic from '../../../../../../../public/assets/images/profile/sova.jpg';
import CustomButtonFollow from "../../../../../ui/CustomButtonFollow/CustomButtonFollow.jsx";
import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent.jsx";
import {getLocaleFromCookie} from "@/utils/locale.js";
import { useRouter } from 'next/navigation';
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";

const FriendItem = ({ friend }) => {
    const router = useRouter();
    const {
        id,
        followedUsername,
        followedAvatarUrl,
        followedTag,
        followerId,
        followedId
    } = friend;

    const handleClick = () => {
        const locale = getLocaleFromCookie();
        const identifier = followedTag || followedUsername;
        router.push(`/${locale}/profile/${identifier}`);
    };
        console.log('FriendItem - friend:', friend);
    return (
        <div className={frItemStyles.friendItemContainer}>
                <div className={frItemStyles.friendDataContainer}>
                <BorderedComponent padding="0px">
                    <MinioImage
                        src={followedAvatarUrl}
                        alt="profile picture"
                        width={60}
                        height={60}
                        className={frItemStyles.profileImage}
                        onClick={handleClick}
                        style={{ cursor: 'pointer' }}
                    />
                </BorderedComponent>
                <div className={frItemStyles.textDataContainer}>
                    <span className={frItemStyles.friendName}>{followedUsername}</span>
                    <span className={frItemStyles.friendTag}>{followedTag}</span>
                </div>
            </div>

            <CustomButtonFollow
                followerId={followerId}
                followedId={followedId}
                recordId={id}
                initiallyFollowing={true}
            />
        </div>
    );
};

export default FriendItem;
