import React from 'react';
import frItemStyles from './FriendItem.module.scss';
import Image from "next/image";
import pic from '../../../../../../../public/assets/images/profile/sova.jpg';
import CustomButtonFollow from "../../../../ui/CustomButtonFollow/CustomButtonFollow.jsx";
import BorderedComponent from "@/app/components/ui/BorderedComponent/BorderedComponent.jsx";

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
                <BorderedComponent padding="0px">
                    <Image
                        src={pic}
                        alt="pic"
                        width={60}
                        height={60}
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
