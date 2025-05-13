import React, {useState} from 'react';
import frItemStyles from './FriendItem.module.scss';
import Image from "next/image";
import pic from '@/../public/assets/images/profile/sova.jpg';
import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent.jsx";
import { getLocaleFromCookie } from "@/utils/locale.js";
import { useRouter } from 'next/navigation';
import CustomButtonFollow from "@/components/ui/CustomButtonFollow/CustomButtonFollow.jsx";
import MinioImage from "@/components/ui/MinioImage/MinioImage.jsx";

const FriendItem = ({ friend, isMe, isFollowing, myId }) => {
    const router = useRouter();
    const {
        id,
        followedUsername,
        followedAvatarUrl,
        followedTag,
        followedId
    } = friend;


    const handleClick = () => {
        const locale = getLocaleFromCookie();
        const identifier = followedTag || followedUsername;
        router.push(`/${locale}/profile/${identifier}`);
    };

    return (
        <div className={frItemStyles.friendItemContainer}>
            <div className={frItemStyles.friendDataContainer}>
                <BorderedComponent padding="0px">
                    <MinioImage
                        src={followedAvatarUrl}
                        alt="profile picture"
                        width={60}
                        height={60}
                        onClick={handleClick}
                        pointer={true}
                    />
                </BorderedComponent>
                <div className={frItemStyles.textDataContainer}>
                    <span className={frItemStyles.friendName}>{followedUsername}</span>
                    <span className={frItemStyles.friendTag}>{followedTag}</span>
                </div>
            </div>

            {!isMe && (
                <CustomButtonFollow
                    followerId={myId}
                    followedId={followedId}
                    recordId={id}
                    initiallyFollowing={isFollowing}
                />
            )}
        </div>
    );
};

export default FriendItem;


// import React from 'react';
// import frItemStyles from './FriendItem.module.scss';
// import Image from "next/image";
// import pic from '@/../public/assets/images/profile/sova.jpg';
// import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent.jsx";
// import {getLocaleFromCookie} from "@/utils/locale.js";
// import { useRouter } from 'next/navigation';
// import CustomButtonFollow from "@/components/ui/CustomButtonFollow/CustomButtonFollow.jsx";
//
// const FriendItem = ({ friend, isMe }) => {
//     const router = useRouter();
//     const {
//         id,
//         followedUsername,
//         followedAvatarUrl,
//         followedTag,
//         followerId,
//         followedId
//     } = friend;
//
//     const handleClick = () => {
//         const locale = getLocaleFromCookie();
//         const identifier = followedTag || followedUsername;
//         router.push(`/${locale}/profile/${identifier}`);
//     };
//         console.log('FriendItem - friend:', friend);
//     return (
//         <div className={frItemStyles.friendItemContainer}>
//             <div className={frItemStyles.friendDataContainer}>
//                 <BorderedComponent padding="0px">
//                     <Image
//                         src={pic}
//                         alt="pic"
//                         width={60}
//                         height={60}
//                         onClick={handleClick}
//                         sx={{ cursor: 'pointer' }}
//                     />
//                 </BorderedComponent>
//                 <div className={frItemStyles.textDataContainer}>
//                     <span className={frItemStyles.friendName}>{followedUsername}</span>
//                     <span className={frItemStyles.friendTag}>{followedTag}</span>
//                 </div>
//             </div>
//
//             {!isMe && <CustomButtonFollow
//                 followerId={followerId}
//                 followedId={followedId}
//                 recordId={id}
//                 initiallyFollowing={true}
//             />}
//         </div>
//     );
// };
//
// export default FriendItem;
