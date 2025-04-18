import React from 'react';
import frItemStyles from './FriendItem.module.scss';
import Image from "next/image";
import pic from '../../../../../../../public/assets/images/profile/sova.jpg';
import CustomButtonFollow from "../../../../../components/ui/CustomButtonFollow/CustomButtonFollow.jsx";

const FriendItem = ({ friend }) => {
    const {
        id,
        followedUsername,
        followedAvatarUrl,
        followedTag,
        followerId,
        followedId
    } = friend;

    return (
        <div className={frItemStyles.friendItemContainer}>
            <div className={frItemStyles.friendDataContainer}>
                <Image
                    className={frItemStyles.avatar}
                    src={pic}
                    alt="pic"
                    width={60}
                    height={60}
                />
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
